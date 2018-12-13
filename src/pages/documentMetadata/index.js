import React from 'react';
import PropTypes from 'prop-types';
import DocumentMetadataView from '../../components/DocumentMetadataView';
import Header from '../../components/Header';
import NodeTitle from '../../components/NodeTitle';
import NodeHeader from '../../components/NodeHeader';

const MetadataPage = ({ match }) => (
	<div className="MetadataPage">
		<Header>
			<NodeTitle
				id={match.params.id}
				itemType="document"
			/>
		</Header>
		<NodeHeader id={match.params.id} itemType="document" />
		<DocumentMetadataView id={match.params.id} />
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
