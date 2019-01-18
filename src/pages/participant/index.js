import React from 'react';
import PropTypes from 'prop-types';
import DetailView from '../../components/DetailView';
import Header from '../../components/Header';
import NodeTitle from '../../components/NodeTitle';
import NodeHeader from '../../components/NodeHeader';

const ParticipantPage = ({ match }) => (
	<div className="ParticipantPage">
		<Header>
			<NodeTitle
				id={match.params.id}
				itemType="stakeholder"
			/>
		</Header>
		<NodeHeader id={match.params.id} itemType="participant" />
		<DetailView id={match.params.id} itemType="stakeholder" />
	</div>
);

ParticipantPage.propTypes = {
	match: PropTypes.shape({
		params: PropTypes.shape({
			id: PropTypes.string,
		}).isRequired,
	}).isRequired,
};

export default ParticipantPage;

