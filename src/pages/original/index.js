import React from 'react';
import PropTypes from 'prop-types';
import OriginalView from '../../components/OriginalView';
import Header from '../../components/Header';
import NodeHeader from '../../components/NodeHeader';

const OriginalPage = ({ match }) => (
	<>
		<Header />
		<NodeHeader id={match.params.id} itemType="document" />
		<OriginalView id={match.params.id} />
	</>
);

OriginalPage.propTypes = {
	match: PropTypes.shape({
		params: PropTypes.shape({
			id: PropTypes.string,
		}).isRequired,
	}).isRequired,
};

export default OriginalPage;

