import React from 'react';
import PropTypes from 'prop-types';
import DetailView from '../../components/DetailView';
import Header from '../../components/Header';
import NodeHeader from '../../components/NodeHeader';
import NodeInfo from '../../components/NodeInfo';

const DocumentPage = ({ match }) => (
	<>
		<Header />
		<NodeHeader id={match.params.id} itemType="document" />
		<NodeInfo id={match.params.id} itemType="document" />
		<DetailView id={match.params.id} itemType="document" />
	</>
);

DocumentPage.propTypes = {
	match: PropTypes.shape({
		params: PropTypes.shape({
			id: PropTypes.string,
		}).isRequired,
	}).isRequired,
};

export default DocumentPage;

