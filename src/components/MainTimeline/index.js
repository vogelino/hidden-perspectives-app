import { withApollo } from 'react-apollo';
import {
	compose,
	lifecycle,
	withState,
} from 'recompose';
import gql from 'graphql-tag';
import { scaleTime, scaleLinear } from 'd3-scale';
import {
	pipe,
	map,
	groupBy,
	prop,
} from 'ramda';
import MainTimeline from './MainTimeline';
import { withLoading, withErrors } from '../../utils/hocUtil';
import {
	roundToTimelineUnit,
	roundToMinimapUnit,
	getTimelineHeightByDates,
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

const getYPositionParser = (scaleFunction, minimapScaleFunction) => (date) => {
	const dateInstance = new Date(date);
	const scaledPosition = scaleFunction(dateInstance);
	const eventYPosition = roundToTimelineUnit(scaledPosition);
	return {
		eventYPosition,
		eventMinimapYPosition: roundToMinimapUnit(minimapScaleFunction(scaledPosition)),
	};
};

const groupEventsBy = (list, groupName) => pipe(
	groupBy(prop(groupName)),
	Object.values,
)(list);

const parseEvents = (
	scaleFunction,
	minimapScaleFunction,
	events,
) => {
	const parseYPosition = getYPositionParser(scaleFunction, minimapScaleFunction);
	const parseAllEvents = pipe(
		map(({ eventStartDate, ...rest }) => ({
			...rest,
			eventStartDate: new Date(eventStartDate),
			...parseYPosition(eventStartDate),
		})),
	);
	const parsedEvents = parseAllEvents(events);
	const timelineEvents = groupEventsBy(parsedEvents, 'eventYPosition');
	const minimapEvents = groupEventsBy(parsedEvents, 'eventMinimapYPosition');
	return { timelineEvents, minimapEvents };
};

const getEvents = ({
	setContainerHeight,
	setEvents,
	stopLoading,
	setMinimapEvents,
}) => ({ data }) => {
	const { allEvents } = data;
	const variables = {
		viewStartDate: new Date(allEvents[0].eventStartDate),
		viewEndDate: new Date(allEvents[allEvents.length - 1].eventStartDate),
	};

	const datesArray = Object.values(variables);
	const height = getTimelineHeightByDates(...datesArray);
	const scaleFunction = scaleTime()
		.domain(datesArray).range([0, (height - (TIMELINE_PADDING * 2))]);
	const minimapScaleFunction = scaleTime()
		.domain([0, height]).range([0, MINIMAP_HEIGHT - (MINIMAP_PADDING * 2)]);

	setContainerHeight(height);

	const { timelineEvents, minimapEvents } = parseEvents(
		scaleFunction, minimapScaleFunction, allEvents,
	);

	const sortedGroups = minimapEvents.sort((a, b) => {
		if (a.length < b.length) return -1;
		if (a.length > b.length) return 1;
		return 0;
	});

	const minimapColorScale = scaleLinear()
		.domain([0, sortedGroups[sortedGroups.length - 1].length])
		.range([1, 0.1, 0]);

	const minimapDots = minimapEvents.map((group) => ({
		density: minimapColorScale(group.length),
		id: group[0].id,
		position: group[0].eventMinimapYPosition,
	}));

	setEvents(timelineEvents);
	setMinimapEvents(minimapDots);
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
