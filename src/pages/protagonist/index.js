import React from 'react';
import PropTypes from 'prop-types';
import DetailView from '../../components/DetailView';
import Header from '../../components/Header';
import NodeHeader from '../../components/NodeHeader';

const ProtagonistPage = ({ match }) => (
	<>
		<Header />
		<NodeHeader id={match.params.id} itemType="stakeholder" />
		<DetailView id={match.params.id} itemType="stakeholder" />
	</>
);

ProtagonistPage.propTypes = {
	match: PropTypes.shape({
		params: PropTypes.shape({
			id: PropTypes.string,
		}).isRequired,
	}).isRequired,
};

export default ProtagonistPage;
