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
import { withRouter } from 'react-router-dom';
import debounce from 'lodash.debounce';
import { withLoading, withErrors, getErrorHandler } from '../../utils/hocUtil';
import { getSearchQuery } from './utils';
import Search from './Search';

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
const performQuery = debounce((client, props) => {
	const { value } = document.getElementById('search-bar');
	const requestTime = Date.now();
	lastRequestTime = requestTime;
	client.query({
		query: getSearchQuery(10),
		variables: { searchQuery: value },
	})
		.then(handleSearchResults(props, value, requestTime))
		.catch(getErrorHandler(props, value, requestTime));
}, 350, { leading: false, trailing: true });

const withSearch = compose(
	withState('searchQuery', 'setSearchQuery', ''),
	withState('allSearchResults', 'setSearchResults', []),
	withState('activeTab', 'setActiveTab', 'all'),
);

export default compose(
	withApollo,
	withLoading,
	withErrors,
	withRouter,
	withSearch,
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
			if (searchResults.length && newIndex > (searchResults.length - 1)) {
				setActiveResult(searchResults[0].id);
				return;
			}
			if (searchResults.length && (newIndex < 0)) {
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
	lifecycle({
		componentDidMount() {
			const {
				onTab,
				onArrow,
				onEnter,
				onEscape,
			} = this.props;
			document.addEventListener('keydown', (evt) => {
				if (!document.querySelector('#search-bar:focus')) return undefined;
				if (evt.code === 'Tab') return onTab(evt);
				if (evt.code === 'Enter') return onEnter(evt);
				if (evt.code === 'Escape') return onEscape(evt);
				if (evt.code === 'ArrowDown' || evt.code === 'ArrowUp') return onArrow(evt);
				return undefined;
			});
		},
	}),
)(Search);
