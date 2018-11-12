import React from 'react';
import PropTypes from 'prop-types';

const DocumentPage = ({ match }) => (
	<div className="DocumentPage">
		{match.params.id}
	</div>
);

DocumentPage.propTypes = {
	match: PropTypes.shape({
		params: PropTypes.shape({
			id: PropTypes.string,
		}).isRequired,
	}).isRequired,
};

export default DocumentPage;

