import { compose, withState, withHandlers } from 'recompose';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import { sortBy, prop } from 'ramda';
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
			orderBy: eventStartDate_ASC
			first: 5
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
			orderBy: documentCreationDate_ASC
			first: 5
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
			orderBy: stakeholderFullName_ASC
			first: 5
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

const handleSearchResults = (props) => ({ data }) => {
	const { stopLoading, setSearchResults } = props;
	const documents = parseDocuments(data.allDocuments);
	const events = parseEvents(data.allEvents);
	const stakeholders = parseStakeholders(data.allStakeholders);
	const unorderedSearchResults = [...stakeholders, ...documents, ...events];
	const searchResults = sortBy(prop('title'), unorderedSearchResults);

	stopLoading();
	setSearchResults(searchResults);
};

export default compose(
	withApollo,
	withLoading,
	withErrors,
	withState('searchQuery', 'setSearchQuery', ''),
	withState('searchResults', 'setSearchResults', []),
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

			if (newSearchQuery.includes(searchQuery) && searchResults.length === 0) return;

			startLoading();
			client.query({
				query: SEARCH_QUERY,
				variables: { searchQuery: newSearchQuery },
			})
				.then(handleSearchResults(props))
				.catch(getErrorHandler(props));
		},
	}),
)(Search);
