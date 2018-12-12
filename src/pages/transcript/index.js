import React from 'react';
import PropTypes from 'prop-types';
import TranscriptView from '../../components/TranscriptView';
import Header from '../../components/Header';
import NodeTitle from '../../components/NodeTitle';

const TranscriptPage = ({ match }) => (
	<div className="TranscriptPage">
		<Header>
			<NodeTitle
				id={match.params.id}
				itemType="document"
			/>
		</Header>
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

