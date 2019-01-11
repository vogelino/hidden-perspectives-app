import {
	compose,
	lifecycle,
	withState,
} from 'recompose';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import { scaleLinear } from 'd3-scale';
import {
	map,
	prop,
	pipe,
	has,
	flatten,
	union,
} from 'ramda';
import DetailView from './DetailView';
import { withLoading, withErrors, getErrorHandler } from '../../utils/hocUtil';
import { ucFirst } from '../../utils/stringUtil';
import { getFormattedDate } from '../../utils/dateUtil';
import { groupItemsBy } from '../../utils/timelineUtil';

const EVENT_QUERY = gql`
	query GetEvent($id: ID!) {
		Event(id: $id) {
			id
			eventTitle
			eventStartDate
			eventTags {
				id
				name
			}
			eventStakeholders {
				id
				stakeholderFullName
			}
		}
	}
`;

const DOCUMENT_QUERY = gql`
	query GetDocument($id: ID!) {
		Document(id: $id) {
			id
			documentTitle
			documentKind {
				id
				name
			}
			documentTags {
				id
				name
			}
			mentionedStakeholders {
				id
				stakeholderFullName
			}

		}
	}
`;

const STAKEHOLDER_QUERY = gql`
	query GetStakholder($id: ID!) {
		Stakeholder(id: $id) {
			id
			stakeholderFullName
		}
	}
`;

const getQueryByItemId = (itemType) => {
	switch (itemType) {
	case 'event': return EVENT_QUERY;
	case 'document': return DOCUMENT_QUERY;
	case 'stakeholder': return STAKEHOLDER_QUERY;
	default: return '';
	}
};

const formatTagsForQuery = (type, tagIds) => map(
	(tagId) => `{ ${type}Tags_some: { id: "${tagId}" } }`,
	tagIds,
);

const getOrderBy = (type) => (
	type === 'document' ? 'documentCreationDate_ASC' : 'eventStartDate_ASC'
);

const getAdditionalReturnValuesByType = (type) => (
	type === 'document' ? `documentCreationDate
	documentKind { id, name }` : 'eventStartDate'
);

const builtQueryStringByType = (type, tagIds) => {
	const formattedTags = formatTagsForQuery(type, tagIds);
	const orderBy = getOrderBy(type);
	const additionalReturnValues = getAdditionalReturnValuesByType(type);
	const stakeholdersFieldName = type === 'document' ? 'mentionedStakeholders' : 'eventStakeholders';
	const query = `
		all${ucFirst(type)}s(
			filter: {
				OR: [
					${formattedTags}
				]
			}
			orderBy: ${orderBy}
		) {
			id
			${type}Title
			${additionalReturnValues}
			${type}Tags {
				id
				name
			}
			${type}Description
			${stakeholdersFieldName} {
				id
				stakeholderFullName
			}
		}
	`;
	return query;
};

const builtTagsQuery = (tagIds) => gql`
	query {
		${builtQueryStringByType('event', tagIds)}
		${builtQueryStringByType('document', tagIds)}
	}
`;

const builtQueryStringByItemId = (type, { id }) => {
	const orderBy = getOrderBy(type);
	const additionalReturnValues = getAdditionalReturnValuesByType(type);
	const stakeholdersFieldName = type === 'document' ? 'mentionedStakeholders' : 'eventStakeholders';
	const query = `
		all${ucFirst(type)}s(
			filter: {
				${stakeholdersFieldName}_some: { id: "${id}" }
			}
			orderBy: ${orderBy}
		) {
			id
			${type}Title
			${additionalReturnValues}
			${type}Tags {
				id
				name
			}
			${type}Description
			${stakeholdersFieldName} {
				id
				stakeholderFullName
			}
		}
	`;
	return query;
};

const builtMentionedInQuery = (item) => gql`
	query {
		${builtQueryStringByItemId('event', item)}
		${builtQueryStringByItemId('document', item)}
	}
`;

const getResponseProp = (key, type, item) => {
	switch (type) {
	case 'event':
	case 'document': return prop(`${type}${ucFirst(key)}`, item);
	case 'stakeholder': return item.stakeholderFullName;
	default: return '';
	}
};

const getItemSubtitle = (item, itemType) => {
	switch (itemType) {
	case 'event': return getFormattedDate(new Date(item.eventStartDate));
	case 'document': return item.documentKind && item.documentKind.name;
	case 'stakeholder': return 'stakeholder';
	default: return '';
	}
};

const getQuery = (item, itemType) => {
	let query;

	if (itemType === 'event' || itemType === 'document') {
		const tags = getResponseProp('tags', itemType, item);
		const tagsQuery = builtTagsQuery(map(prop('id'), tags));
		query = tagsQuery;
	} else if (itemType === 'stakeholder') {
		const mentionedInQuery = builtMentionedInQuery(item);
		query = mentionedInQuery;
	}

	return query;
};

const getProtagonists = (item, itemType, allDocuments, allEvents) => {
	const items = itemType === 'protagonist' ? union(allDocuments, allEvents) : [item];

	const protagonistsFromAllItems = items.map((currentItem) => {
		const isEvent = has('eventStakeholders');
		const stakeholdersFieldName = isEvent(currentItem) ? 'eventStakeholders' : 'mentionedStakeholders';
		return currentItem[stakeholdersFieldName];
	});

	const flattenedProtagonists = flatten(protagonistsFromAllItems);
	const clusterProtagonists = (data) => data
		.reduce((acc, current) => {
			const { id } = current;
			return Object.assign(acc, {
				[id]: (acc[id] || []).concat(current),
			});
		}, {});
	const parsedProtagonists = clusterProtagonists(flattenedProtagonists);

	return parsedProtagonists;
};

const getContextParser = (props, item) => ({ data: { allEvents, allDocuments } }) => {
	const {
		itemType,
		stopLoading,
		setDocuments,
		setEvents,
		setProtagonists,
	} = props;
	const dateExtremes = [
		new Date(allDocuments[0].documentCreationDate),
		new Date(allDocuments[allDocuments.length - 1].documentCreationDate),
	];
	const angleScaleFunction = scaleLinear()
		.domain(dateExtremes)
		.range([0, 320]);

	const roundAngle = (angle) => angle - (angle % 4);
	const getAngle = pipe(angleScaleFunction, roundAngle);
	const parsedDocuments = pipe(
		map((document) => {
			const { id, documentCreationDate } = document;
			const date = new Date(documentCreationDate);
			const angle = getAngle(date);
			return {
				...document,
				id,
				date,
				angle,
			};
		}),
		(items) => groupItemsBy(items, 'angle'),
	)(allDocuments);

	const parsedEvents = pipe(
		map((event) => {
			const { id, eventStartDate } = event;
			const date = new Date(eventStartDate);
			const angle = getAngle(date);
			return {
				...event,
				id,
				date,
				angle,
			};
		}),
		(items) => groupItemsBy(items, 'angle'),
	)(allEvents);

	setDocuments(parsedDocuments);
	setEvents(parsedEvents);
	setProtagonists(getProtagonists(item, itemType, allDocuments, allEvents));

	stopLoading();
};

const getItemParser = (props) => ({ data }) => {
	const { client, setItem, itemType } = props;
	const dataItemName = ucFirst(itemType);
	const item = data[dataItemName];

	setItem({
		id: item.id,
		title: getResponseProp('title', itemType, item),
		subtitle: getItemSubtitle(item, itemType),
		itemType,
	});

	client.query({
		query: getQuery(item, itemType),
	})
		.then(getContextParser(props, item))
		.catch(getErrorHandler(props));
};

export default compose(
	withApollo,
	withLoading,
	withErrors,
	withState('item', 'setItem', undefined),
	withState('documents', 'setDocuments', []),
	withState('events', 'setEvents', []),
	withState('protagonists', 'setProtagonists', {}),
	lifecycle({
		componentDidMount() {
			const { id, client, itemType } = this.props;
			client.query({
				query: getQueryByItemId(itemType),
				variables: { id },
			})
				.then(getItemParser(this.props))
				.catch(getErrorHandler(this.props));
		},
	}),
)(DetailView);
