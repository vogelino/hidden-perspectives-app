import React from 'react';
import PropTypes from 'prop-types';

const TranscriptView = ({ id }) => (
	<div>{`Transcript for: ${id}`}</div>
);

TranscriptView.propTypes = {
	id: PropTypes.string.isRequired,
};

export default TranscriptView;
