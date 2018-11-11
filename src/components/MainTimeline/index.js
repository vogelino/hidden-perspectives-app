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
	eventsToMinimapDots,
	groupEventsBy,
} from '../../utils/timelineUtil';
import { TIMELINE_PADDING, MINIMAP_HEIGHT, MINIMAP_PADDING } from '../../state/constants';

const ALL_EVENTS = gql`
	query {
		allEvents(
			orderBy: eventStartDate_ASC
		) {
			id
			eventTitle
			eventStartDate
		}
	}
`;

const parseEvents = (
	scaleFunction,
	minimapScaleFunction,
	events,
) => {
	const parseYPosition = getYPositionParser(scaleFunction, minimapScaleFunction);
	const parsedEvents = events.map(({ eventStartDate, ...rest }) => ({
		...rest,
		eventStartDate: new Date(eventStartDate),
		...parseYPosition(eventStartDate),
	}));
	return {
		timelineEvents: groupEventsBy(parsedEvents, 'eventYPosition'),
		minimapEvents: eventsToMinimapDots(groupEventsBy(parsedEvents, 'eventMinimapYPosition')),
	};
};

const getEvents = ({
	setContainerHeight,
	setEvents,
	stopLoading,
	setMinimapEvents,
}) => ({ data: { allEvents } }) => {
	const datesArray = [
		new Date(allEvents[0].eventStartDate),
		new Date(allEvents[allEvents.length - 1].eventStartDate),
	];
	const height = getTimelineHeightByDates(...datesArray);

	const scaleFunction = scaleTime()
		.domain(datesArray).range([0, (height - (TIMELINE_PADDING * 2))]);

	const minimapScaleFunction = scaleTime()
		.domain([0, height]).range([0, MINIMAP_HEIGHT - (MINIMAP_PADDING * 2)]);

	const { timelineEvents, minimapEvents } = parseEvents(
		scaleFunction, minimapScaleFunction, allEvents,
	);

	setContainerHeight(height);
	setEvents(timelineEvents);
	setMinimapEvents(minimapEvents);
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
	withState('minimapEvents', 'setMinimapEvents', []),
	withState('containerHeight', 'setContainerHeight', 800),
	lifecycle({
		componentDidMount() {
			const { props } = this;

			props.client.query({ query: ALL_EVENTS })
				.then(getEvents(props))
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
