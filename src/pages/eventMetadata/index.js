import React from 'react';
import PropTypes from 'prop-types';
import MetadataView from '../../components/MetadataView';
import Header from '../../components/Header';
import NodeHeader from '../../components/NodeHeader';

const EventMetadataPage = ({ match }) => (
	<div className="MetadataPage">
		<Header />
		<NodeHeader id={match.params.id} itemType="event" />
		<MetadataView id={match.params.id} itemType="event" />
	</div>
);

EventMetadataPage.propTypes = {
	match: PropTypes.shape({
		params: PropTypes.shape({
			id: PropTypes.string,
		}).isRequired,
	}).isRequired,
};

export default EventMetadataPage;
