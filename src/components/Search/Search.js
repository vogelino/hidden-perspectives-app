import React from 'react';
import PropTypes from 'prop-types';
import SearchField from './SearchField';
import SearchResults from './SearchResults';
import Errors from '../Errors';
import { Container } from './styles';

const Search = (props) => (
	<Container className="tour-search">
		<Errors errors={props.errors} />
		<SearchField {...props} />
		<SearchResults {...props} />
	</Container>
);

Search.propTypes = {
	searchQuery: PropTypes.string,
	onSearch: PropTypes.func,
	isLoading: PropTypes.bool,
	searchResults: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		type: PropTypes.oneOf(['event', 'document', 'stakeholder', 'location']).isRequired,
	})),
	errors: Errors.propTypes.errors,
};

Search.defaultProps = {
	searchQuery: '',
	onSearch: () => {},
	isLoading: false,
	searchResults: [],
	errors: Errors.defaultProps.errors,
};

export default Search;
