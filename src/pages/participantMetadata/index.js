import React from 'react';
import PropTypes from 'prop-types';
import MetadataView from '../../components/MetadataView';
import Header from '../../components/Header';
import NodeTitle from '../../components/NodeTitle';
import NodeHeader from '../../components/NodeHeader';

const ParticipantMetadataPage = ({ match }) => (
	<div className="MetadataPage">
		<Header>
			<NodeTitle
				id={match.params.id}
				itemType="stakeholder"
			/>
		</Header>
		<NodeHeader id={match.params.id} itemType="participant" />
		<MetadataView id={match.params.id} itemType="stakeholder" />
	</div>
);

ParticipantMetadataPage.propTypes = {
	match: PropTypes.shape({
		params: PropTypes.shape({
			id: PropTypes.string,
		}).isRequired,
	}).isRequired,
};

export default ParticipantMetadataPage;
