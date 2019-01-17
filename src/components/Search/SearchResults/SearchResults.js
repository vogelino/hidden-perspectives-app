import React from 'react';
import PropTypes from 'prop-types';
import {
	Container,
	Content,
	Results,
	Result,
	LoadingResult,
	TabsContainer,
	Tabs,
	Tab,
	TabHint,
	Key,
	Highlight,
} from './styles';

const loadingResults = Object.keys([...Array(3)]);

const getFormattedTitle = (title, searchQuery) => {
	const index = title.toLowerCase().indexOf(searchQuery.toLowerCase());
	let formattedTitle = title;

	if (index >= 0) {
		formattedTitle = (
			<span>
				{title.substring(0, index)}
				<Highlight>{title.substring(index, index + searchQuery.length)}</Highlight>
				{title.substring(index + searchQuery.length)}
			</span>
		);
	}

	return <span>{formattedTitle}</span>;
};

const SearchResults = ({
	searchQuery,
	isLoading,
	searchResults,
	tabs,
	activeTab,
	activeResult,
	setActiveResult,
	setActiveTab,
}) => (
	<Container show={!!searchQuery}>
		<Content>
			<TabsContainer>
				<Tabs>
					{tabs.map(({ key, title }) => (
						<Tab
							key={key}
							className={activeTab === key && 'active'}
							onClick={() => setActiveTab(key)}
						>
							{title}
						</Tab>
					))}
				</Tabs>
				<TabHint>
					{'Press Tab'}
					<Key>⇥</Key>
					{'to toggle through categories'}
				</TabHint>
			</TabsContainer>
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
					>
						{getFormattedTitle(title, searchQuery)}
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
	setActiveTab: PropTypes.func,
	searchResults: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		type: PropTypes.oneOf(['event', 'document', 'stakeholder', 'location']).isRequired,
	})),
	activeTab: PropTypes.oneOf(['all', 'event', 'document', 'stakeholder', 'location']),
	tabs: PropTypes.arrayOf(PropTypes.shape({
		key: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
	})),
};

SearchResults.defaultProps = {
	searchQuery: '',
	isLoading: true,
	searchResults: [],
	activeTab: 'all',
	activeResult: undefined,
	setActiveResult: () => {},
	setActiveTab: () => {},
	tabs: [
		{ key: 'all', title: 'All' },
		{ key: 'event', title: 'Events' },
		{ key: 'document', title: 'Documents' },
		{ key: 'stakeholder', title: 'Participants' },
	],
};

export default SearchResults;
