import { withApollo } from 'react-apollo';
import { compose, lifecycle, withState, withHandlers } from 'recompose';
import gql from 'graphql-tag';
import MainTimeline from './MainTimeline';
import { withLoading, withErrors, getErrorHandler } from '../../utils/hocUtil';
import { getMinimap } from '../../utils/timelineUtil';

import { getFormattedDate } from '../../utils/dateUtil';

import { parseItemsToDates } from './utils';

const ALL_EVENTS_AND_DOCUMENTS = gql`
	{
		allEvents(orderBy: eventStartDate_ASC) {
			id
			eventTitle
			eventStartDate
			eventDescription
			eventStakeholders {
				id
				stakeholderFullName
			}
		}
		allDocuments(orderBy: documentCreationDate_ASC) {
			id
			documentTitle
			documentDescription
			documentCreationDate
			mentionedStakeholders {
				id
				stakeholderFullName
			}
		}
	}
`;

const normaliseItems = ({ items, itemDateProperty, itemTitleProperty, itemType }) =>
	items.map((props) => {
		const date = new Date(props[itemDateProperty]);
		const { id } = props;
		return {
			...props,
			id,
			date,
			dateString: getFormattedDate(date),
			title: props[itemTitleProperty],
			path: `/${itemType}/context/${id}`,
			type: itemType,
		};
	});

const structureItems = ({ timelineEvents, timelineDocuments }) => {
	const nodes = [...timelineEvents, ...timelineDocuments].sort((a, b) => {
		const dateA = Date.parse(a.dateString);
		const dateB = Date.parse(b.dateString);

		if (dateA > dateB) return 1;
		if (dateA < dateB) return -1;
		return 0;
	});

	const firstYear = parseInt(nodes[0].dateString.split('-')[0], 10);
	return parseItemsToDates(firstYear, nodes);
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
	setDocumentsCount,
	setEventsCount,
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
	setDocumentsCount(documents.length);
	setEventsCount(events.length);
	stopLoading();
};

export default compose(
	withApollo,
	withLoading,
	withErrors,
	withState('timelineItems', 'setTimelineItems', []),
	withState('eventsCount', 'setEventsCount', 0),
	withState('documentsCount', 'setDocumentsCount', 0),
	withState('protagonistsCount', 'setProtagonistsCount', 0),
	withState('minimapItems', 'setMinimapItems', []),
	withState('bubbleChartItems', 'setBubbleChartItems', {}),
	withState('timelineContainer', 'setTimelineContainer', null),
	withState('fetchingProtagonists', 'setFetchingProtagonists', true),
	withState('initialProtagonistsFetched', 'setInitialProtagonistsFetched', false),
	withState('hoveredElement', 'setHoveredElement', null),
	withState('pinnedElement', 'setPinnedElement', null),
	withState('activeRowIndex', 'setActiveRowIndex', 266),
	withState('activeYear', 'setActiveYear', '1993'),
	lifecycle({
		componentDidMount() {
			const { props } = this;
			console.log(props.client);
			props.client
				.query({ query: ALL_EVENTS_AND_DOCUMENTS })
				.then(getEventsAndDocuments(props))
				.catch(getErrorHandler(props));
		},

		shouldComponentUpdate(nextProps) {
			return (
				nextProps.timelineItems.length !== this.props.timelineItems.length ||
				nextProps.bubbleChartItems !== this.props.bubbleChartItems ||
				nextProps.fetchingProtagonists !== this.props.fetchingProtagonists ||
				nextProps.errors.length !== this.props.errors.length ||
				nextProps.isLoading !== this.props.isLoading ||
				nextProps.hoveredElement !== this.props.hoveredElement ||
				nextProps.pinnedElement !== this.props.pinnedElement ||
				nextProps.eventsCount !== this.props.eventsCount ||
				nextProps.documentsCount !== this.props.documentsCount ||
				nextProps.protagonistsCount !== this.props.protagonistsCount ||
				nextProps.activeRowIndex !== this.props.activeRowIndex ||
				nextProps.activeYear !== this.props.activeYear ||
				nextProps.hoveredElement !== this.props.hoveredElement
			);
		},
	}),
)(MainTimeline);
