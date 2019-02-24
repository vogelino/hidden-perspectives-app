import gql from 'graphql-tag';

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
