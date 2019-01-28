import React from 'react';
import PropTypes from 'prop-types';
import NodeTitle from '../NodeTitle';
import {
	Container,
	BackButton,
	Tabs,
	Tab,
	EditButton,
	NodeTitleContainer,
	TabsContainer,
} from './styles';

const NodeHeader = ({
	tabs,
	editUrl,
	editText,
	isStatic,
	id,
	itemType,
}) => (
	<Container isStatic={isStatic}>
		<NodeTitleContainer>
			<NodeTitle id={id} itemType={itemType} />
		</NodeTitleContainer>
		<TabsContainer>
			<BackButton to="/">Back to Timeline</BackButton>
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
	id: PropTypes.string.isRequired,
	itemType: PropTypes.oneOf(['document', 'event', 'protagonist', 'location']).isRequired,
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
