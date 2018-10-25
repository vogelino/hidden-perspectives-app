import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const DocumentList = ({ documents }) => (
	<div>
		{documents.map(({ id, documentTitle }) => (
			<li key={id}>
				<small>{id}</small>
				<h2>{documentTitle}</h2>
			</li>
		))}
	</div>
);

DocumentList.propTypes = {
	documents: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.string.isRequired,
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

