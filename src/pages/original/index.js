import React from 'react';
import PropTypes from 'prop-types';
import OriginalView from '../../components/OriginalView';
import Header from '../../components/Header';
import NodeTitle from '../../components/NodeTitle';
import NodeHeader from '../../components/NodeHeader';

const OriginalPage = ({ match }) => (
	<div className="OriginalPage">
		<Header>
			<NodeTitle
				id={match.params.id}
				itemType="document"
			/>
		</Header>
		<NodeHeader id={match.params.id} itemType="document" />
		<OriginalView id={match.params.id} />
	</div>
);

OriginalPage.propTypes = {
	match: PropTypes.shape({
		params: PropTypes.shape({
			id: PropTypes.string,
		}).isRequired,
	}).isRequired,
};

export default OriginalPage;

