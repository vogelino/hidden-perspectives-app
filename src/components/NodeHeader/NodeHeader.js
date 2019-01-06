import React from 'react';
import PropTypes from 'prop-types';
import {
	Container,
	BackButton,
	Tabs,
	Tab,
	EditButton,
} from './styles';

const NodeHeader = ({
	tabs,
	editUrl,
	editText,
	isStatic,
}) => (
	<Container isStatic={isStatic}>
		<BackButton to="/">Back to Timeline</BackButton>
		<Tabs>
			{tabs.map(({ label, url }) => (
				<Tab key={label} to={url}>{label}</Tab>
			))}
		</Tabs>
		<EditButton to={editUrl}>{editText}</EditButton>
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
	editText: 'Edit metadata',
	tabs: [],
	isStatic: false,
};

export default NodeHeader;
