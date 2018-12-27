import { withApollo } from 'react-apollo';
import {
	compose,
	lifecycle,
	withState,
	withHandlers,
} from 'recompose';
import gql from 'graphql-tag';
import { filter } from 'ramda';
import debounce from 'lodash.debounce';
import MainTimeline from './MainTimeline';
import { withLoading, withErrors, getErrorHandler } from '../../utils/hocUtil';
import { getMinimap } from '../../utils/timelineUtil';
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

const GET_DOCUMENT_STAKEHOLDERS = gql`
	query GetDocumentProtagonists($id: ID!) {
		Document(id: $id) {
			id
			mentionedStakeholders {
				id
				stakeholderFullName
			}
		}
	}
`;

const GET_EVENT_STAKEHOLDERS = gql`
	query GetEventProtagonists($id: ID!) {
		Event(id: $id) {
			id
			eventStakeholders {
				id
				stakeholderFullName
			}
		}
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
						const filterDateString = filter(({ dateString }) => (
							dateString === dayId
						));
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

const isDocumentID = (id) => id.startsWith('uir');

const getClusteredProtagonists = (data) => data
	.map((d) => {
		const { Document, Event } = d.data;
		return Document ? Document.mentionedStakeholders : Event.eventStakeholders;
	})
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

const fetchProtagonistsByID = (props, id) => props.client.query({
	query: isDocumentID(id) ? GET_DOCUMENT_STAKEHOLDERS : GET_EVENT_STAKEHOLDERS,
	variables: { id },
});

const isInViewport = (element, offset = 0) => {
	if (!element) {
		return false;
	}

	const { top } = element.getBoundingClientRect();
	const isUnderUpperBound = (top + offset) >= 0;
	const isAboveLowerBound = (top - offset) <= window.innerHeight;
	return isUnderUpperBound && isAboveLowerBound;
};

const getEventIDsInViewport = (timelineElement) => {
	const timelineEvents = timelineElement.getElementsByClassName('timeline-event');
	const eventIDs = [...timelineEvents]
		.filter(isInViewport)
		.map((timelineEvent) => timelineEvent.getAttribute('data-id'));

	return eventIDs;
};

const handleScroll = (event, props) => {
	const {
		setBubbleChartItems,
		setFetchingProtagonists,
	} = props;

	setFetchingProtagonists(true);

	const timelineElement = event.target;
	const timelineEventIDs = getEventIDsInViewport(timelineElement);
	const protagonistPromises = timelineEventIDs.map(
		(eventID) => fetchProtagonistsByID(props, eventID),
	);

	Promise.all(protagonistPromises)
		.then((response) => {
			const clusteredProtagonists = getClusteredProtagonists(response);
			setBubbleChartItems(clusteredProtagonists);
			setFetchingProtagonists(false);
		})
		.catch(getErrorHandler(props));
};

const handleOnRef = (props) => (ref) => {
	if (ref) {
		ref.addEventListener('scroll', debounce((event) => handleScroll(event, props), 500));
	}
};

export default compose(
	withApollo,
	withLoading,
	withErrors,
	withState('timelineItems', 'setTimelineItems', []),
	withState('minimapItems', 'setMinimapItems', []),
	withState('bubbleChartItems', 'setBubbleChartItems', {}),
	withState('fetchingProtagonists', 'setFetchingProtagonists', false),
	withHandlers({
		onRef: (props) => handleOnRef(props),
	}),
	lifecycle({
		componentDidMount() {
			const { props } = this;
			props.client.query({ query: ALL_EVENTS_AND_DOCUMENTS })
				.then(getEventsAndDocuments(props))
				.catch(getErrorHandler(props));
		},
		shouldComponentUpdate(nextProps) {
			return (nextProps.timelineItems.length !== this.props.timelineItems.length)
				|| (nextProps.bubbleChartItems !== this.props.bubbleChartItems)
				|| (nextProps.fetchingProtagonists !== this.props.fetchingProtagonists)
				|| (nextProps.errors.length !== this.props.errors.length)
				|| (nextProps.isLoading !== this.props.isLoading);
		},
	}),
)(MainTimeline);
