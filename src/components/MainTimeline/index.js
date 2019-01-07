import { withApollo } from 'react-apollo';
import {
	compose,
	lifecycle,
	withState,
	withHandlers,
	onlyUpdateForKeys,
} from 'recompose';
import gql from 'graphql-tag';
import {
	filter,
	map,
	groupBy,
	union,
	propEq,
} from 'ramda';
import debounce from 'lodash.debounce';
import MainTimeline from './MainTimeline';
import { withLoading, withErrors, getErrorHandler } from '../../utils/hocUtil';
import { getMinimap } from '../../utils/timelineUtil';
import { ucFirst } from '../../utils/stringUtil';
import isDocumentId from '../../utils/isDocumentId';
import {
	monthsLabels,
	getDifferenceInYears,
	formatYear,
	ensureTwoDigits,
	getFormattedDate,
} from '../../utils/dateUtil';

const ALL_EVENTS_AND_DOCUMENTS = gql`
	{
		allEvents(orderBy: eventStartDate_ASC) {
			id
			eventTitle
			eventStartDate
		}
		allDocuments(orderBy: documentCreationDate_ASC) {
			id
			documentTitle
			documentCreationDate
		}
	}
`;

const getFilterArgsForQuery = (type, itemIds) => map(
	(id) => `{ id: "${id}" }`,
	itemIds,
);

const builtProtagonistQueryStringByType = (type, itemIds) => {
	const stakeholdersFieldName = type === 'document' ? 'mentionedStakeholders' : 'eventStakeholders';
	const query = `
		all${ucFirst(type)}s(
			filter: {
				OR: [
					${getFilterArgsForQuery(type, itemIds)}
				]
			}
		) {
			id
			${type}Title
			${stakeholdersFieldName} {
				id
				stakeholderFullName
			}
		}
	`;
	return query;
};

const protagonistQueries = (groupedItemIds) => Object.keys(groupedItemIds).map((key) => builtProtagonistQueryStringByType(key, groupedItemIds[key])); // eslint-disable-line
const builtProtagonistQuery = (itemIds) => gql`
	query {
		${protagonistQueries(itemIds)}
	}
`;

const normaliseItems = ({
	items,
	itemDateProperty,
	itemTitleProperty,
	itemType,
}) => items.map((props) => {
	const date = new Date(props[itemDateProperty]);
	const { id } = props;
	return {
		id,
		date,
		dateString: getFormattedDate(date),
		title: props[itemTitleProperty],
		path: `/${itemType}/context/${id}`,
		type: itemType,
	};
});

const structureItems = ({
	datesArray,
	timelineEvents,
	timelineDocuments,
}) => {
	const startYear = parseInt(formatYear(datesArray[0], 'YYYY'), 10);
	const yearsAmount = getDifferenceInYears(...datesArray);
	const items = [...Array(yearsAmount)].map((_, yearIdx) => {
		const year = `${startYear + yearIdx}`;
		return {
			key: year,
			year,
			months: [...Array(12)].map((__, monthIdx) => {
				const month = monthsLabels[monthIdx];
				const monthNumber = ensureTwoDigits(monthIdx + 1);
				return {
					key: `${year}-${monthNumber}`,
					month,
					days: [...Array(31)].map((___, dayIdx) => {
						const day = ensureTwoDigits(dayIdx + 1);
						const dayId = `${year}-${monthNumber}-${day}`;
						const filterDateString = filter(propEq('dateString', dayId));
						return {
							key: dayId,
							day: `${dayIdx + 1}`,
							events: filterDateString(timelineEvents),
							documents: filterDateString(timelineDocuments),
						};
					}).filter(({ events, documents }) => (
						(events && events.length > 0)
						|| (documents && documents.length > 0)
					)),
				};
			}),
		};
	});
	return items;
};

const getClusteredProtagonists = ({ data: { allEvents: events, allDocuments: documents } }) => {
	const combinedEventsAndDocuments = union(events, documents);
	const protagonists = combinedEventsAndDocuments.map((item) => item.mentionedStakeholders || item.eventStakeholders); // eslint-disable-line

	return protagonists
		.reduce((acc, current) => {
			const flattenedProtagonists = acc.concat(current);
			return flattenedProtagonists;
		}, [])
		.reduce((acc, current) => {
			const { id } = current;
			return Object.assign(acc, {
				[id]: (acc[id] || []).concat(current),
			});
		}, {});
};

const parseItems = ({ events, datesArray, documents }) => {
	const timelineEvents = normaliseItems({
		items: events,
		itemDateProperty: 'eventStartDate',
		itemTitleProperty: 'eventTitle',
		itemType: 'event',
	});

	const timelineDocuments = normaliseItems({
		items: documents,
		itemDateProperty: 'documentCreationDate',
		itemTitleProperty: 'documentTitle',
		itemType: 'document',
	});

	return structureItems({
		datesArray,
		timelineEvents,
		timelineDocuments,
	});
};

const getEventsAndDocuments = ({
	setTimelineItems,
	stopLoading,
	setMinimapItems,
}) => ({ data: { allEvents: events, allDocuments: documents } }) => {
	const items = parseItems({
		events,
		documents,
		datesArray: [
			new Date(documents[0].documentCreationDate),
			new Date(documents[documents.length - 1].documentCreationDate),
		],
	});

	setTimelineItems(items);
	setMinimapItems(getMinimap(items));
	stopLoading();
};

const isInViewport = (element, offset = 0) => {
	if (!element) {
		return false;
	}

	const { top } = element.getBoundingClientRect();
	const isUnderUpperBound = (top + offset) >= 0;
	const isAboveLowerBound = (top - offset) <= window.innerHeight;
	return isUnderUpperBound && isAboveLowerBound;
};

const getEventIdsInViewport = (timelineElement) => {
	const timelineEvents = timelineElement.getElementsByClassName('timeline-event');
	const eventIds = [...timelineEvents]
		.filter(isInViewport)
		.map((timelineEvent) => timelineEvent.getAttribute('data-id'));

	return eventIds;
};

const getProtagonistsInViewport = (timelineElement, props) => {
	const {
		setBubbleChartItems,
		setFetchingProtagonists,
	} = props;

	const timelineEventIds = getEventIdsInViewport(timelineElement);

	if (timelineEventIds.length > 0) {
		const groupById = groupBy((id) => (isDocumentId(id) ? 'document' : 'event'));
		const groupedItemIds = groupById(timelineEventIds);

		setFetchingProtagonists(true);

		props.client.query({
			query: builtProtagonistQuery(groupedItemIds),
		})
			.then((response) => {
				const clusteredProtagonists = getClusteredProtagonists(response);
				setBubbleChartItems(clusteredProtagonists);
				setFetchingProtagonists(false);
			})
			.catch(getErrorHandler(props));
	} else {
		setBubbleChartItems({});
	}
};

const onRef = (props) => (ref) => {
	if (ref) {
		props.setTimelineContainer(ref);
		ref.addEventListener('scroll', debounce((event) => getProtagonistsInViewport(event.target, props), 350));
	}
};

export default compose(
	withApollo,
	withLoading,
	withErrors,
	withState('timelineItems', 'setTimelineItems', []),
	withState('minimapItems', 'setMinimapItems', []),
	withState('bubbleChartItems', 'setBubbleChartItems', {}),
	withState('timelineContainer', 'setTimelineContainer', null),
	withState('fetchingProtagonists', 'setFetchingProtagonists', true),
	withState('initialProtagonistsFetched', 'setInitialProtagonistsFetched', false),
	withState('hoveredElement', 'setHoveredElement', null),
	withHandlers({ onRef }),
	lifecycle({
		componentDidMount() {
			const { props } = this;
			props.client.query({ query: ALL_EVENTS_AND_DOCUMENTS })
				.then(getEventsAndDocuments(props))
				.catch(getErrorHandler(props));
		},
		componentDidUpdate() {
			const { props } = this;

			if (!props.initialProtagonistsFetched) {
				props.setInitialProtagonistsFetched(true);
				getProtagonistsInViewport(props.timelineContainer, props);
			}
		},
	}),
	onlyUpdateForKeys([
		'timelineItems',
		'bubbleChartItems',
		'fetchingProtagonists',
		'errors',
		'isLoading',
		'hoveredElement',
	]),
)(MainTimeline);
