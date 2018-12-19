import React from 'react';
import PropTypes from 'prop-types';
import EventMetadataView from '../../components/EventMetadataView';
import Header from '../../components/Header';
import NodeTitle from '../../components/NodeTitle';
import NodeHeader from '../../components/NodeHeader';

const MetadataPage = ({ match }) => (
	<div className="MetadataPage">
		<Header>
			<NodeTitle
				id={match.params.id}
				itemType="event"
			/>
		</Header>
		<NodeHeader id={match.params.id} itemType="event" />
		<EventMetadataView id={match.params.id} />
	</div>
);

MetadataPage.propTypes = {
	match: PropTypes.shape({
		params: PropTypes.shape({
			id: PropTypes.string,
		}).isRequired,
	}).isRequired,
};

export default MetadataPage;
