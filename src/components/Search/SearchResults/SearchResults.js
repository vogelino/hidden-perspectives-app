import React from 'react';
import PropTypes from 'prop-types';
import { Container } from './styles';

const SearchResults = ({
	searchQuery,
	isLoading,
	searchResults,
	activeTab,
}) => (
	<Container show={!!searchQuery}>
		{activeTab}
		{isLoading}
		{searchResults.map(({ id, title }) => (
			<span key={id}>{title}</span>
		))}
	</Container>
);

SearchResults.propTypes = {
	searchQuery: PropTypes.string,
	isLoading: PropTypes.bool,
	searchResults: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		type: PropTypes.oneOf(['event', 'document', 'stakeholder', 'location']).isRequired,
	})),
	activeTab: PropTypes.oneOf(['all', 'event', 'document', 'stakeholder', 'location']),
};

SearchResults.defaultProps = {
	searchQuery: '',
	isLoading: true,
	searchResults: [],
	activeTab: 'all',
};

export default SearchResults;
