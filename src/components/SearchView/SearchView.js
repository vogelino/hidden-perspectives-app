import React from 'react';
import PropTypes from 'prop-types';
import SearchResults from '../Search/SearchResults';

const SearchView = ({ query, ...props }) => (
	<SearchResults
		{...props}
		searchQuery={query}
	/>
);

SearchView.propTypes = {
	query: PropTypes.string,
};

SearchView.defaultProps = {
	query: '',
};

export default SearchView;
