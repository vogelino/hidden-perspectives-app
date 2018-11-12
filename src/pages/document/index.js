import React from 'react';
import PropTypes from 'prop-types';
import DetailView from '../../components/DetailView';

const DocumentPage = ({ match }) => (
	<div className="DocumentPage">
		<DetailView id={match.params.id} itemType="document" />
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

