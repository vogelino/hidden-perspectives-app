import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import {
	Container,
	List,
	Title,
	Id,
	ListElement,
	ListTitle,
} from './styles';

const DocumentList = ({ documents }) => (
	<Container>
		<ListTitle>Documents</ListTitle>
		<List>
			{documents.map(({ documentOriginalID, documentTitle }) => (
				<ListElement key={documentOriginalID}>
					<Title>
						<Id>{documentOriginalID}</Id>
						{documentTitle}
					</Title>
				</ListElement>
			))}
		</List>
	</Container>
);

DocumentList.propTypes = {
	documents: PropTypes.arrayOf(PropTypes.shape({
		documentOriginalID: PropTypes.string.isRequired,
		documentTitle: PropTypes.string.isRequired,
	})),
};

DocumentList.defaultProps = {
	documents: [],
};

const ALL_DOCUMENTS_QUERY = gql`
	query allDocuments {
	  allDocuments {
		id
		documentTitle
		documentOriginalID
	  }
	}
`;

export default () => (
	<Query query={ALL_DOCUMENTS_QUERY}>
		{({ loading, error, data }) => {
			if (loading) return 'Loading...';
			if (error) return `Error! ${error.message}`;

			return <DocumentList documents={data.allDocuments} />;
		}}
	</Query>
);

