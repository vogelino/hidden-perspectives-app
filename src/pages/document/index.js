import React from 'react';
import PropTypes from 'prop-types';
import DetailView from '../../components/DetailView';
import Header from '../../components/Header';
import NodeTitle from '../../components/NodeTitle';

const DocumentPage = ({ match }) => (
	<div className="DocumentPage">
		<Header>
			<NodeTitle
				id={match.params.id}
				itemType="document"
			/>
		</Header>
		<DetailView id={match.params.id} itemType="document" />
	</div>
);

DocumentPage.propTypes = {
	match: PropTypes.shape({
		params: PropTypes.shape({
			id: PropTypes.string,
		}).isRequired,
	}).isRequired,
};

export default DocumentPage;

