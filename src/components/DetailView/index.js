import {
	compose,
	lifecycle,
	withState,
} from 'recompose';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import { scaleLinear } from 'd3-scale';
import { withRouter } from 'react-router-dom';
import {
	map,
	prop,
	pipe,
	has,
	flatten,
	union,
	sortBy,
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

const LOCATION_QUERY = gql`
	query GetLocation($id: ID!) {
		Location(id: $id) {
			id
			locationName
		}
	}
`;

const getQueryByItemId = (itemType) => {
	switch (itemType) {
	case 'event': return EVENT_QUERY;
	case 'document': return DOCUMENT_QUERY;
	case 'stakeholder': return STAKEHOLDER_QUERY;
	case 'location': return LOCATION_QUERY;
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

const builtStakeholderQueryStringByItemId = (type, { id }) => {
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

const builtLocationQueryStringByItemId = (type, { id }) => {
	const orderBy = getOrderBy(type);
	const additionalReturnValues = getAdditionalReturnValuesByType(type);
	const locationsFieldName = type === 'document' ? 'mentionedLocations' : 'eventLocations';
	const query = `
		all${ucFirst(type)}s(
			filter: {
				${locationsFieldName}_some: { id: "${id}" }
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
			${locationsFieldName} {
				id
				locationName
			}
		}
	`;
	return query;
};

const builtStakeholderMentionedInQuery = (item) => gql`
	query {
		${builtStakeholderQueryStringByItemId('event', item)}
		${builtStakeholderQueryStringByItemId('document', item)}
	}
`;

const builtLocationMentionedInQuery = (item) => gql`
	query {
		${builtLocationQueryStringByItemId('event', item)}
		${builtLocationQueryStringByItemId('document', item)}
	}
`;

const getResponseProp = (key, type, item) => {
	switch (type) {
	case 'event':
	case 'document': return prop(`${type}${ucFirst(key)}`, item);
	case 'stakeholder': return item.stakeholderFullName;
	case 'location': return item.locationName;
	default: return '';
	}
};

const getItemSubtitle = (item, itemType) => {
	switch (itemType) {
	case 'event': return getFormattedDate(new Date(item.eventStartDate));
	case 'document': return item.documentKind && item.documentKind.name;
	case 'stakeholder': return 'stakeholder';
	case 'location': return 'location';
	default: return '';
	}
};

const getQuery = (item, itemType) => {
	let query;
	let tags = [];

	if (itemType === 'event' || itemType === 'document') {
		tags = getResponseProp('tags', itemType, item);
		const tagsQuery = builtTagsQuery(map(prop('id'), tags));
		query = tagsQuery;
	} else if (itemType === 'stakeholder') {
		const mentionedInQuery = builtStakeholderMentionedInQuery(item);
		query = mentionedInQuery;
	} else if (itemType === 'location') {
		const mentionedInQuery = builtLocationMentionedInQuery(item);
		query = mentionedInQuery;
	}

	return { query, tags };
};

const getProtagonists = (item, itemType, allDocuments, allEvents) => {
	const items = itemType === 'stakeholder' || itemType === 'location' ? union(allDocuments, allEvents) : [item];

	const protagonistsFromAllItems = items.map((currentItem) => {
		const isEvent = has('eventStakeholders');
		const stakeholdersFieldName = isEvent(currentItem) ? 'eventStakeholders' : 'mentionedStakeholders';
		return currentItem[stakeholdersFieldName];
	});

	const flattenedProtagonists = flatten(protagonistsFromAllItems);
	const clusterProtagonists = (data) => data
		.filter((d) => d)
		.reduce((acc, current) => {
			const { id } = current;
			return Object.assign(acc, {
				[id]: (acc[id] || []).concat(current),
			});
		}, {});
	const parsedProtagonists = clusterProtagonists(flattenedProtagonists);

	return parsedProtagonists;
};

const getDocOrEventParser = (getAngle) => pipe(
	map(({ date, ...item }) => ({
		...item,
		date,
		angle: getAngle(date),
	})),
	(items) => groupItemsBy(items, 'angle'),
	sortBy(prop('date')),
);

const normalizeItems = (keysMap, items, tags) => map((item) => ({
	...item,
	date: new Date(item[keysMap.date]),
	commonTags: item[keysMap.tags].filter((itemTag) => tags.some(({ id }) => id === itemTag.id)),
}), items);

const mapAllItemsDates = ({ allDocuments, allEvents, tags }) => {
	const documentKeysMap = {
		date: 'documentCreationDate',
		tags: 'documentTags',
	};
	const eventKeysMap = {
		date: 'eventStartDate',
		tags: 'eventTags',
	};
	const normalizedDocuments = normalizeItems(documentKeysMap, allDocuments, tags);
	const normalizedEvents = normalizeItems(eventKeysMap, allEvents, tags);
	const allItems = sortBy(prop('date'), union(normalizedDocuments, normalizedEvents));
	return {
		allItems,
		documents: normalizedDocuments,
		events: normalizedEvents,
	};
};

const getContextParser = (props, item, tags) => ({ data: { allEvents, allDocuments } }) => {
	const {
		itemType,
		stopLoading,
		setDocuments,
		setEvents,
		setProtagonists,
		setItemCounts,
	} = props;

	if (allDocuments.length === 0 && allEvents.length === 0) {
		setDocuments([]);
		setEvents([]);
		stopLoading();
		return;
	}

	const { allItems, documents, events } = mapAllItemsDates({ allDocuments, allEvents, tags });

	const dateExtremes = [
		allItems[0].date,
		allItems[allItems.length - 1].date,
	];
	const angleScaleFunction = scaleLinear()
		.domain(dateExtremes)
		.range([0, 320]);

	const roundAngle = (angle) => angle - (angle % 4);
	const getAngle = pipe(angleScaleFunction, roundAngle);
	const itemParser = getDocOrEventParser(getAngle);
	const parsedDocuments = itemParser(documents);
	const parsedEvents = itemParser(events);
	const protagonists = getProtagonists(item, itemType, allDocuments, allEvents);

	setItemCounts({
		documentsCount: allDocuments.length,
		eventsCount: allEvents.length,
		protagonistsCount: protagonists.length,
	});
	setDocuments(parsedDocuments);
	setEvents(parsedEvents);
	setProtagonists(protagonists);

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

	const { query, tags } = getQuery(item, itemType);
	client.query({ query })
		.then(getContextParser(props, item, tags))
		.catch(getErrorHandler(props));
};

const performQuery = (props) => {
	const {
		id,
		client,
		itemType,
		startLoading,
	} = props;
	startLoading();
	client.query({
		query: getQueryByItemId(itemType),
		variables: { id },
	})
		.then(getItemParser(props))
		.catch(getErrorHandler(props));
};

export default compose(
	withApollo,
	withLoading,
	withErrors,
	withRouter,
	withState('item', 'setItem', undefined),
	withState('documents', 'setDocuments', []),
	withState('events', 'setEvents', []),
	withState('protagonists', 'setProtagonists', {}),
	withState('itemCounts', 'setItemCounts', { eventsCount: 0, documentsCount: 0, protagonistsCount: 0 }),
	withState('hoveredElement', 'setHoveredElement', null),
	withState('pinnedElement', 'setPinnedElement', null),
	lifecycle({
		componentDidMount() {
			performQuery(this.props);
		},
		shouldComponentUpdate(nextProps) {
			const { id } = this.props;
			if (nextProps.id !== id) {
				performQuery(nextProps);
			}
			return (
				this.props.item !== nextProps.item
				|| this.props.documents !== nextProps.documents
				|| this.props.events !== nextProps.events
				|| this.props.protagonists !== nextProps.protagonists
				|| this.props.hoveredElement !== nextProps.hoveredElement
				|| this.props.pinnedElement !== nextProps.pinnedElement
				|| this.props.isLoading !== nextProps.isLoading
				|| this.props.itemType !== nextProps.itemType
				|| this.props.errors !== nextProps.errors
			);
		},
	}),
)(DetailView);
