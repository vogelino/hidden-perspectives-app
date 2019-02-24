import React from 'react';
import PropTypes from 'prop-types';

const SearchView = ({ query }) => <div>{query}</div>;

SearchView.propTypes = {
	query: PropTypes.string,
};

SearchView.defaultProps = {
	query: '',
};

export default SearchView;
