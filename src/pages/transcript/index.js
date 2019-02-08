import React from 'react';
import PropTypes from 'prop-types';
import TranscriptView from '../../components/TranscriptView';
import Header from '../../components/Header';
import NodeHeader from '../../components/NodeHeader';

const TranscriptPage = ({ match }) => (
	<>
		<Header />
		<NodeHeader id={match.params.id} itemType="document" />
		<TranscriptView id={match.params.id} />
	</>
);

TranscriptPage.propTypes = {
	match: PropTypes.shape({
		params: PropTypes.shape({
			id: PropTypes.string,
		}).isRequired,
	}).isRequired,
};

export default TranscriptPage;

