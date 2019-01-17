import { compose, withState, withHandlers } from 'recompose';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import { sortBy, prop } from 'ramda';
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

const handleSearchResults = (props, value) => ({ data }) => {
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
	client.query({
		query: SEARCH_QUERY,
		variables: { searchQuery: value },
	})
		.then(handleSearchResults(props, value))
		.catch(getErrorHandler(props, value));
}, 350, { leading: false, trailing: true });

export default compose(
	withApollo,
	withLoading,
	withErrors,
	withRouter,
	withState('searchQuery', 'setSearchQuery', ''),
	withState('searchResults', 'setSearchResults', []),
	withState('activeResult', 'setActiveResult', undefined),
	withState('activeTab', 'setActiveTab', 'all'),
	withHandlers({
		onSearch: (props) => (newSearchQuery) => {
			const {
				setSearchQuery,
				startLoading,
				searchQuery,
				searchResults,
				client,
			} = props;

			setSearchQuery(newSearchQuery);

			const prevQueryAlreadyGaveNoResults = searchQuery
				&& newSearchQuery.includes(searchQuery)
				&& searchResults.length === 0;
			if (prevQueryAlreadyGaveNoResults) return;

			startLoading();
			performQuery(client, props);
		},
		onResultClick: ({ setSearchQuery, history }) => ({ id, type }) => {
			setSearchQuery('');
			history.push(`/${type}/context/${id}`);
		},
	}),
)(Search);
