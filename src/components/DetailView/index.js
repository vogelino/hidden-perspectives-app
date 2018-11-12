import { compose, lifecycle, withState } from 'recompose';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import { scaleLinear } from 'd3-scale';
import { map, pipe } from 'ramda';
import DetailView from './DetailView';
import { withLoading } from '../../utils/hocUtil';
import { ucFirst } from '../../utils/stringUtil';
import { getFormattedDate } from '../../utils/dateUtil';
import { groupItemsBy } from '../../utils/timelineUtil';

const EVENT_QUERY = gql`
	query GetEvent($id: ID!) {
		Event(id: $id) {
			id
			eventTitle
			eventStartDate
		}
	}
`;

const DOCUMENT_QUERY = gql`
	query GetDocument($id: ID!) {
		Document(id: $id) {
			id
			documentTitle
			documentKind {
				name
			}
			sessionNumber
		}
	}
`;

const DOCUMENTS_IN_SAME_SESSION = gql`
	query GetDocumentsBySession($sessionNumber: Int!) {
		allDocuments(
			filter: {sessionNumber: $sessionNumber}
			orderBy: documentCreationDate_ASC
		) {
			id
			documentCreationDate
		}
	}
`;

const EVENTS_IN_SESSION_TIMESPAN = gql`
	query GetEventsInRange($startDate: DateTime!, $endDate: DateTime!) {
		allEvents(
			filter: {
				AND: [
					{ eventStartDate_gte: $startDate }
					{ eventEndDate_lte: $endDate }
				]
			}
			orderBy: eventStartDate_ASC
		) {
			id
			eventStartDate
		}
	}
`;

const getEventsParser = (props, angleScaleFunction) => ({ data: { allEvents } }) => {
	const { setEvents, stopLoading } = props;

	const parsedEvents = pipe(
		map(({ id, eventStartDate }) => {
			const date = new Date(eventStartDate);
			const angle = angleScaleFunction(date);
			return {
				id,
				date,
				angle: angle - (angle % 10),
			};
		}),
		(items) => groupItemsBy(items, 'angle'),
	)(allEvents);

	setEvents(parsedEvents);
	stopLoading();
};

const getDocumentsParser = (props) => ({ data: { allDocuments } }) => {
	const { setDocuments, client } = props;
	const dateExtremes = [
		new Date(allDocuments[0].documentCreationDate),
		new Date(allDocuments[allDocuments.length - 1].documentCreationDate),
	];

	const angleScaleFunction = scaleLinear()
		.domain(dateExtremes)
		.range([0, 320]);

	client.query({
		query: EVENTS_IN_SESSION_TIMESPAN,
		variables: {
			startDate: dateExtremes[0],
			endDate: dateExtremes[1],
		},
	}).then(getEventsParser(props, angleScaleFunction));

	const parsedDocuments = pipe(
		map(({ id, documentCreationDate }) => {
			const date = new Date(documentCreationDate);
			const angle = angleScaleFunction(date);
			return {
				id,
				date,
				angle: angle - (angle % 10),
			};
		}),
		(items) => groupItemsBy(items, 'angle'),
	)(allDocuments);
	setDocuments(parsedDocuments);
};

const getItemParser = (props) => ({ data }) => {
	const {
		client,
		setItem,
		stopLoading,
		itemType,
	} = props;
	const dataItemName = ucFirst(itemType);
	const item = data[dataItemName];
	setItem({
		id: item.id,
		title: item[`${itemType}Title`],
		subtitle: itemType === 'document'
			? item.documentKind && item.documentKind.name
			: getFormattedDate(new Date(item.eventStartDate)),
		itemType,
	});

	if (itemType === 'document') {
		client.query({
			query: DOCUMENTS_IN_SAME_SESSION,
			variables: { sessionNumber: item.sessionNumber },
		}).then(getDocumentsParser(props));
	} else {
		stopLoading();
	}
};

export default compose(
	withApollo,
	withLoading,
	withState('item', 'setItem', undefined),
	withState('documents', 'setDocuments', []),
	withState('events', 'setEvents', []),
	lifecycle({
		componentDidMount() {
			const { id, client, itemType } = this.props;
			client.query({
				query: itemType === 'event' ? EVENT_QUERY : DOCUMENT_QUERY,
				variables: { id },
			}).then(getItemParser(this.props));
		},
	}),
)(DetailView);
