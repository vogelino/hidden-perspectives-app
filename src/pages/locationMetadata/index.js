import React from 'react';
import PropTypes from 'prop-types';
import MetadataView from '../../components/MetadataView';
import Header from '../../components/Header';
import NodeTitle from '../../components/NodeTitle';
import NodeHeader from '../../components/NodeHeader';

const LocationMetadataPage = ({ match }) => (
	<div className="LocationPage">
		<Header>
			<NodeTitle
				id={match.params.id}
				itemType="location"
			/>
		</Header>
		<NodeHeader id={match.params.id} itemType="location" />
		<MetadataView id={match.params.id} itemType="location" />
	</div>
);

LocationMetadataPage.propTypes = {
	match: PropTypes.shape({
		params: PropTypes.shape({
			id: PropTypes.string,
		}).isRequired,
	}).isRequired,
};

export default LocationMetadataPage;
