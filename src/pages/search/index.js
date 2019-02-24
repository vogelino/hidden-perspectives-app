import React from 'react';
import PropTypes from 'prop-types';
import SearchView from '../../components/SearchView';
import Header from '../../components/Header';

const OriginalPage = ({ match }) => (
	<>
		<Header />
		<SearchView query={match.params.query} />
	</>
);

OriginalPage.propTypes = {
	match: PropTypes.shape({
		params: PropTypes.shape({
			query: PropTypes.string,
		}).isRequired,
	}).isRequired,
};

export default OriginalPage;

