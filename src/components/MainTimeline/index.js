import { withApollo } from 'react-apollo';
import {
	compose,
	lifecycle,
	withState,
} from 'recompose';
import gql from 'graphql-tag';
import { scaleTime } from 'd3-scale';
import MainTimeline from './MainTimeline';
import { withLoading, withErrors } from '../../utils/hocUtil';
import {
	getYPositionParser,
	getTimelineHeightByDates,
	toMinimapDots,
	groupItemsBy,
} from '../../utils/timelineUtil';
import { TIMELINE_PADDING, MINIMAP_HEIGHT, MINIMAP_PADDING } from '../../state/constants';
import { getFormattedDate } from '../../utils/dateUtil';

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

const parseItems = ({
	scaleFunction,
	minimapScaleFunction,
	items,
	itemDateProperty,
	itemTitleProperty,
	itemType,
}) => {
	const parseYPosition = getYPositionParser(scaleFunction, minimapScaleFunction);
	const parsedItems = items.map((props) => ({
		id: props.id,
		date: getFormattedDate(new Date(props[itemDateProperty])),
		title: props[itemTitleProperty],
		path: `/${itemType}/${props.id}`,
		...parseYPosition(props[itemDateProperty]),
	}));
	return {
		timelineItems: groupItemsBy(parsedItems, 'yPosition'),
		minimapItems: toMinimapDots(groupItemsBy(parsedItems, 'minimapYPosition')),
	};
};

const getEventsAndDocuments = ({
	setContainerHeight,
	setEvents,
	setDocuments,
	stopLoading,
	setMinimapEvents,
	setMinimapDocuments,
}) => ({ data: { allEvents, allDocuments } }) => {
	const datesArray = [
		new Date(allDocuments[0].documentCreationDate),
		new Date(allDocuments[allDocuments.length - 1].documentCreationDate),
	];
	const height = getTimelineHeightByDates(...datesArray);

	const scaleFunction = scaleTime()
		.domain(datesArray).range([0, (height - (TIMELINE_PADDING * 2))]);

	const minimapScaleFunction = scaleTime()
		.domain([0, height]).range([0, MINIMAP_HEIGHT - (MINIMAP_PADDING * 2)]);

	const { timelineItems: timelineEvents, minimapItems: minimapEvents } = parseItems({
		scaleFunction,
		minimapScaleFunction,
		items: allEvents,
		itemDateProperty: 'eventStartDate',
		itemTitleProperty: 'eventTitle',
		itemType: 'event',
	});

	const { timelineItems: timelineDocuments, minimapItems: minimapDocuments } = parseItems({
		scaleFunction,
		minimapScaleFunction,
		items: allDocuments,
		itemDateProperty: 'documentCreationDate',
		itemTitleProperty: 'documentTitle',
		itemType: 'document',
	});

	setContainerHeight(height);
	setEvents(timelineEvents);
	setMinimapEvents(minimapEvents);
	setDocuments(timelineDocuments);
	setMinimapDocuments(minimapDocuments);
	stopLoading();
};

const handleErrors = ({ setErrors }) => ({ message, graphQLErrors }) => {
	setErrors(message ? [message] : graphQLErrors);
};

export default compose(
	withApollo,
	withLoading,
	withErrors,
	withState('events', 'setEvents', []),
	withState('documents', 'setDocuments', []),
	withState('minimapEvents', 'setMinimapEvents', []),
	withState('minimapDocuments', 'setMinimapDocuments', []),
	withState('containerHeight', 'setContainerHeight', 800),
	lifecycle({
		componentDidMount() {
			const { props } = this;

			props.client.query({ query: ALL_EVENTS_AND_DOCUMENTS })
				.then(getEventsAndDocuments(props))
				.catch(handleErrors(props));
		},
		shouldComponentUpdate(nextProps) {
			return (nextProps.events.length !== this.props.events.length)
				|| (nextProps.containerHeight !== this.props.containerHeight)
				|| (nextProps.errors.length !== this.props.errors.length)
				|| (nextProps.isLoading !== this.props.isLoading);
		},
	}),
)(MainTimeline);
