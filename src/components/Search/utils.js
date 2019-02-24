import gql from 'graphql-tag';
import {
	sortBy,
	prop,
	propEq,
	findIndex,
} from 'ramda';
import {
	compose,
	withState,
	withHandlers,
	mapProps,
} from 'recompose';
import { withRouter } from 'react-router-dom';
import { withLoading, withErrors } from '../../utils/hocUtil';

export const getSearchQuery = (limit) => gql`
	query Search($searchQuery: String!) {
		allEvents(
			filter: {
				OR: [
					{ eventTitle_contains: $searchQuery }
					{ eventDescription_contains: $searchQuery }
					{ eventStakeholders_some: {
						stakeholderFullName_contains: $searchQuery
					} }
				]
			}
			${limit ? `first: ${limit}` : ''}
		) {
			id
			eventTitle
		}
		allDocuments(
			filter: {
				OR: [
					{ documentTitle_contains: $searchQuery }
					{ documentDescription_contains: $searchQuery }
					{ documentTranscript_contains: $searchQuery }
					{ mentionedStakeholders_some: {
						stakeholderFullName_contains: $searchQuery
					} }
				]
			}
			${limit ? `first: ${limit}` : ''}
		) {
			id
			documentTitle
		}
		allStakeholders(
			filter: {
				OR: [
					{ stakeholderFullName_contains: $searchQuery }
					{ stakeholderDescription_contains: $searchQuery }
				]
			}
			${limit ? `first: ${limit}` : ''}
		) {
			id
			stakeholderFullName
		}
	}
`;

const getElementParser = (type, titleKey) => (items) => items.map((item) => ({
	id: item.id,
	title: item[titleKey],
	type,
}));

const parseDocuments = getElementParser('document', 'documentTitle');
const parseEvents = getElementParser('event', 'eventTitle');
const parseStakeholders = getElementParser('stakeholder', 'stakeholderFullName');
const contains = (container, containment) => container.toLowerCase()
	.includes(containment.toLowerCase());

export const handleSearchResults = (props, value) => ({ data }) => {
	const { stopLoading, setSearchResults } = props;
	const documents = parseDocuments(data.allDocuments);
	const events = parseEvents(data.allEvents);
	const stakeholders = parseStakeholders(data.allStakeholders);
	const unorderedSearchResults = [...stakeholders, ...documents, ...events];
	const allSearchResults = sortBy(prop('title'), unorderedSearchResults);
	const withHighlights = allSearchResults.filter(({ title }) => contains(title, value));
	const withoutHighlights = allSearchResults.filter(({ title }) => !contains(title, value));
	const searchResults = [...withHighlights, ...withoutHighlights];

	stopLoading();
	setSearchResults(searchResults);
};

export const withSearch = compose(
	withLoading,
	withErrors,
	withRouter,
	withState('searchQuery', 'setSearchQuery', ''),
	withState('allSearchResults', 'setSearchResults', []),
	withState('activeTab', 'setActiveTab', 'all'),
	withState('activeResult', 'setActiveResult', undefined),
	mapProps((props) => {
		const searchResults = props.activeTab === 'all'
			? props.allSearchResults
			: props.allSearchResults.filter(propEq('type', props.activeTab));
		return {
			...props,
			searchResults,
			tabs: [
				{ key: 'all', title: 'All' },
				{ key: 'event', title: 'Events' },
				{ key: 'document', title: 'Documents' },
				{ key: 'stakeholder', title: 'Protagonists' },
			],
		};
	}),
	withHandlers({
		onResultClick: ({ setSearchQuery, history }) => ({ id, type }) => {
			setSearchQuery('');
			const itemType = type === 'stakeholder' ? 'protagonist' : type;
			history.push(`/${itemType}/context/${id}`);
		},
		onTab: (props) => (evt) => {
			evt.preventDefault();
			const {
				activeTab,
				setActiveTab,
				tabs,
			} = props;
			const indexOfCurrent = findIndex(propEq('key', activeTab), tabs);
			const newIndex = indexOfCurrent + 1;
			if (newIndex > (tabs.length - 1)) {
				setActiveTab(tabs[0].key);
				return;
			}
			const newTab = tabs[newIndex].key;
			setActiveTab(newTab);
		},
		onArrow: (props) => (evt) => {
			evt.preventDefault();
			const { activeResult, setActiveResult, searchResults } = props;
			const indexOfCurrent = findIndex(propEq('id', activeResult), searchResults);
			const newIndex = indexOfCurrent + (evt.code === 'ArrowDown' ? 1 : -1);
			if (searchResults.length && (newIndex > (searchResults.length - 1) || !activeResult)) {
				setActiveResult(searchResults[0].id);
				return;
			}
			if (searchResults.length && (newIndex < 0 || !activeResult)) {
				setActiveResult(searchResults[searchResults.length - 1].id);
				return;
			}
			setActiveResult(searchResults[newIndex].id);
		},
		onEnter: ({ searchQuery, setSearchQuery, ...props }) => (evt) => {
			evt.preventDefault();
			setSearchQuery('');
			const { history, searchResults, activeResult } = props;
			const activeResultObj = searchResults.find(propEq('id', activeResult));
			if (!activeResultObj) {
				history.push(`/search/${encodeURIComponent(searchQuery)}`);
				return;
			}
			const { id, type } = activeResultObj;
			const itemType = type === 'stakeholder' ? 'protagonist' : type;
			history.push(`/${itemType}/context/${id}`);
		},
		onEscape: (props) => (evt) => {
			evt.preventDefault();
			const { setSearchQuery } = props;
			setSearchQuery('');
		},
	}),
);
