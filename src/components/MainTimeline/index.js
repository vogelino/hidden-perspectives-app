import { withApollo } from 'react-apollo';
import {
	compose,
	lifecycle,
	withState,
} from 'recompose';
import gql from 'graphql-tag';
import { filter } from 'ramda';
import MainTimeline from './MainTimeline';
import { withLoading, withErrors } from '../../utils/hocUtil';
import { getMinimap } from '../../utils/timelineUtil';
import {
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

const monthsLabels = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];

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
		path: `/${itemType}/${id}`,
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

const handleErrors = ({ setErrors }) => ({ message, graphQLErrors }) => {
	setErrors(message ? [message] : graphQLErrors);
};

export default compose(
	withApollo,
	withLoading,
	withErrors,
	withState('timelineItems', 'setTimelineItems', []),
	withState('minimapItems', 'setMinimapItems', []),
	lifecycle({
		componentDidMount() {
			const { props } = this;

			props.client.query({ query: ALL_EVENTS_AND_DOCUMENTS })
				.then(getEventsAndDocuments(props))
				.catch(handleErrors(props));
		},
		shouldComponentUpdate(nextProps) {
			return (nextProps.timelineItems.length !== this.props.timelineItems.length)
				|| (nextProps.errors.length !== this.props.errors.length)
				|| (nextProps.isLoading !== this.props.isLoading);
		},
	}),
)(MainTimeline);
