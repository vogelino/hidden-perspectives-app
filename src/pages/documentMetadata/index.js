import React from 'react';
import PropTypes from 'prop-types';
import DocumentMetadataView from '../../components/DocumentMetadataView';

const MetadataPage = ({ match }) => (
	<div className="MetadataPage">
		<DocumentMetadataView id={match.params.id} />
	</div>
);

MetadataPage.propTypes = {
	match: PropTypes.shape({
		params: PropTypes.shape({
			id: PropTypes.string,
		}).isRequired,
	}).isRequired,
};

export default MetadataPage;
