import {
	compose,
	withState,
	withHandlers,
	lifecycle,
	mapProps,
} from 'recompose';
import {
	propEq,
	sortBy,
	prop,
	findIndex,
} from 'ramda';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import { withRouter } from 'react-router-dom';
import debounce from 'lodash.debounce';
import { withLoading, withErrors, getErrorHandler } from '../../utils/hocUtil';
import Search from './Search';

const SEARCH_QUERY = gql`
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
			first: 10
		) {
			id
			eventTitle
		}
		allDocuments(
			filter: {
				OR: [
					{ documentTitle_contains: $searchQuery }
					{ documentDescription_contains: $searchQuery }
					{ mentionedStakeholders_some: {
						stakeholderFullName_contains: $searchQuery
					} }
				]
			}
			first: 10
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
			first: 10
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


let lastRequestTime;
const handleSearchResults = (props, value, requestTime) => ({ data }) => {
	if (requestTime !== lastRequestTime) return;
	const { stopLoading, setSearchResults, setActiveResult } = props;
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
	setActiveResult(searchResults.length ? searchResults[0].id : undefined);
};
const performQuery = debounce((client, props) => {
	const { value } = document.getElementById('search-bar');
	const requestTime = Date.now();
	lastRequestTime = requestTime;
	client.query({
		query: SEARCH_QUERY,
		variables: { searchQuery: value },
	})
		.then(handleSearchResults(props, value, requestTime))
		.catch(getErrorHandler(props, value, requestTime));
}, 350, { leading: false, trailing: true });

export default compose(
	withApollo,
	withLoading,
	withErrors,
	withRouter,
	withState('searchQuery', 'setSearchQuery', ''),
	withState('allSearchResults', 'setSearchResults', []),
	withState('activeResult', 'setActiveResult', undefined),
	withState('activeTab', 'setActiveTab', 'all'),
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
				{ key: 'stakeholder', title: 'Participants' },
			],
		};
	}),
	withHandlers({
		onSearch: (props) => (newSearchQuery) => {
			const {
				setSearchQuery,
				startLoading,
				searchQuery,
				allSearchResults,
				client,
			} = props;

			setSearchQuery(newSearchQuery);

			const prevQueryAlreadyGaveNoResults = searchQuery
				&& newSearchQuery.includes(searchQuery)
				&& allSearchResults.length === 0;
			if (prevQueryAlreadyGaveNoResults) return;

			startLoading();
			performQuery(client, props);
		},
		onResultClick: ({ setSearchQuery, history }) => ({ id, type }) => {
			setSearchQuery('');
			history.push(`/${type}/context/${id}`);
		},
		onTab: (props) => (evt) => {
			evt.preventDefault();
			const {
				setActiveResult,
				activeTab,
				setActiveTab,
				tabs,
				allSearchResults,
			} = props;
			const indexOfCurrent = findIndex(propEq('key', activeTab), tabs);
			const newIndex = indexOfCurrent + 1;
			if (newIndex > (tabs.length - 1)) {
				setActiveTab(tabs[0].key);
				return;
			}
			const newTab = tabs[newIndex].key;
			setActiveTab(newTab);
			if (newTab === 'all') return;
			const filteredResults = allSearchResults.filter(propEq('type', newTab));
			if (filteredResults.length) setActiveResult(filteredResults[0].id);
		},
		onArrow: (props) => (evt) => {
			evt.preventDefault();
			const { activeResult, setActiveResult, searchResults } = props;
			const indexOfCurrent = findIndex(propEq('id', activeResult), searchResults);
			const newIndex = indexOfCurrent + (evt.code === 'ArrowDown' ? 1 : -1);
			if (newIndex > (searchResults.length - 1)) {
				setActiveResult(searchResults[0].id);
				return;
			}
			if (newIndex < 0) {
				setActiveResult(searchResults[searchResults.length - 1].id);
				return;
			}
			setActiveResult(searchResults[newIndex].id);
		},
		onEnter: (props) => (evt) => {
			evt.preventDefault();
			const { history, searchResults, activeResult } = props;
			const activeResultObj = searchResults.find(propEq('id', activeResult));
			if (!activeResultObj) return;
			const { id, type } = activeResultObj;
			history.push(`/${type}/context/${id}`);
		},
	}),
	lifecycle({
		componentDidMount() {
			const { onTab, onArrow, onEnter } = this.props;
			document.addEventListener('keydown', (evt) => {
				if (evt.code === 'Tab') return onTab(evt);
				if (evt.code === 'Enter') return onEnter(evt);
				if (evt.code === 'ArrowDown' || evt.code === 'ArrowUp') return onArrow(evt);
				return undefined;
			});
		},
	}),
)(Search);
