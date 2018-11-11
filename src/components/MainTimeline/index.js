import { withApollo } from 'react-apollo';
import {
	compose,
	lifecycle,
	withState,
} from 'recompose';
import gql from 'graphql-tag';
import { scaleTime } from 'd3-scale';
import {
	pipe,
	map,
	groupBy,
	prop,
} from 'ramda';
import MainTimeline from './MainTimeline';
import { withLoading, withErrors } from '../../utils/hocUtil';
import { roundToUnit, getTimelineHeightByDates } from '../../utils/timelineUtil';

const EARLIEST_EVENT_QUERY = gql`
  query GetEarliestEvent {
	allEvents(
		orderBy: eventStartDate_ASC
		first: 1
	) {
		eventStartDate
	}
  }
`;

const ALL_EVENTS_FROM_TO_QUERY = gql`
  query GetEventsInView(
    $viewStartDate: DateTime!
    $viewEndDate: DateTime!
  ) {
    allEvents(
      orderBy: eventStartDate_ASC
      filter: {
        AND: [
          {
            eventStartDate_gte: $viewStartDate
          },
          {
            eventEndDate_lte: $viewEndDate
          }
        ]
      }
    ) {
	  id
      eventTitle
	  eventStartDate
    }
}
`;

const getEarliestDate = ({ client }) => client.query({
	query: EARLIEST_EVENT_QUERY,
});

const getYPositionParser = (scaleFunction) => (date) => {
	const dateInstance = new Date(date);
	const scaledPosition = scaleFunction(dateInstance);
	return roundToUnit(scaledPosition);
};

const parseEvents = (scaleFunction) => ({ data: { allEvents } }) => new Promise((resolve) => {
	const parseYPosition = getYPositionParser(scaleFunction);
	const parseAllEvents = pipe(
		map(({ eventStartDate, ...rest }) => ({
			...rest,
			eventStartDate: new Date(eventStartDate),
			eventYPosition: parseYPosition(eventStartDate),
		})),
		groupBy(prop('eventYPosition')),
		Object.values,
	);
	resolve(parseAllEvents(allEvents));
});

const getEventsInViewport = ({
	client,
	setContainerHeight,
	setEvents,
	stopLoading,
}) => ({ data }) => {
	const variables = {
		viewStartDate: new Date(data.allEvents[0].eventStartDate),
		viewEndDate: new Date(),
	};

	const datesArray = Object.values(variables);
	const height = getTimelineHeightByDates(...datesArray);
	const scaleFunction = scaleTime().domain(datesArray).range([0, height]);

	setContainerHeight(height);

	return client.query({ query: ALL_EVENTS_FROM_TO_QUERY, variables })
		.then(parseEvents(scaleFunction))
		.then((events) => {
			setEvents(events);
			stopLoading();
		});
};

const handleErrors = ({ setErrors }) => ({ message, graphQLErrors }) => {
	setErrors(message ? [message] : graphQLErrors);
};

export default compose(
	withApollo,
	withLoading,
	withErrors,
	withState('events', 'setEvents', []),
	withState('containerHeight', 'setContainerHeight', 800),
	lifecycle({
		componentDidMount() {
			const { props } = this;

			getEarliestDate(props)
				.then(getEventsInViewport(props))
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
