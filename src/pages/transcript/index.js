import React from 'react';
import PropTypes from 'prop-types';
import TranscriptView from '../../components/TranscriptView';

const TranscriptPage = ({ match }) => (
	<div className="TranscriptPage">
		<TranscriptView id={match.params.id} />
	</div>
);

TranscriptPage.propTypes = {
	match: PropTypes.shape({
		params: PropTypes.shape({
			id: PropTypes.string,
		}).isRequired,
	}).isRequired,
};

export default TranscriptPage;

