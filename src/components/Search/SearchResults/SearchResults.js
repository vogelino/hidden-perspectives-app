import React from 'react';
import PropTypes from 'prop-types';
import {
	Container,
	Content,
	Results,
	Result,
	LoadingResult,
} from './styles';

const loadingResults = Object.keys([...Array(3)]);

const SearchResults = ({
	searchQuery,
	isLoading,
	searchResults,
	activeTab,
	activeResult,
	setActiveResult,
}) => (
	<Container show={!!searchQuery}>
		<Content>
			{activeTab}
			<Results>
				{isLoading && loadingResults.map((key) => (
					<LoadingResult key={key}>&nbsp;</LoadingResult>
				))}
				{!isLoading && searchResults.map(({ id, title, type }) => (
					<Result
						key={id}
						type={type}
						className={activeResult === id && 'highlighted'}
						onMouseEnter={() => setActiveResult(id)}
						onMouseLeave={() => setActiveResult(undefined)}
					>
						{title}
					</Result>
				))}
			</Results>
		</Content>
	</Container>
);

SearchResults.propTypes = {
	searchQuery: PropTypes.string,
	activeResult: PropTypes.string,
	isLoading: PropTypes.bool,
	setActiveResult: PropTypes.func,
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
	activeResult: undefined,
	setActiveResult: () => {},
};

export default SearchResults;
