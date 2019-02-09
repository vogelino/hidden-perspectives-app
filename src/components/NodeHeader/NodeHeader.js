import React from 'react';
import PropTypes from 'prop-types';
import {
	Container,
	BackButton,
	Tabs,
	Tab,
	EditButton,
	TabsContainer,
} from './styles';

const NodeHeader = ({
	tabs,
	editUrl,
	editText,
	isStatic,
}) => (
	<Container isStatic={isStatic}>
		<TabsContainer>
			<BackButton to="/">←</BackButton>
			<Tabs>
				{tabs.map(({ label, url }) => (
					<Tab key={label} to={url}>{label}</Tab>
				))}
			</Tabs>
			<EditButton to={editUrl}>{editText}</EditButton>
		</TabsContainer>
	</Container>
);

NodeHeader.propTypes = {
	editUrl: PropTypes.string,
	editText: PropTypes.string,
	tabs: PropTypes.arrayOf(PropTypes.shape({
		label: PropTypes.string.isRequired,
		url: PropTypes.string.isRequired,
	})),
	isStatic: PropTypes.bool,
};

NodeHeader.defaultProps = {
	editUrl: undefined,
	editText: '✎',
	tabs: [],
	isStatic: false,
};

export default NodeHeader;
