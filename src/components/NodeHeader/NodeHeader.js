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
			<BackButton to="/">←</BackButton>
			<NodeTitle id={id} itemType={itemType} />
			<EditButton to={editUrl}>{editText}</EditButton>
		</NodeTitleContainer>
		<TabsContainer>
			<Tabs>
				{tabs.map(({ label, url }) => (
					<Tab key={label} to={url}>{label}</Tab>
				))}
			</Tabs>
		</TabsContainer>
	</Container>
);

NodeHeader.propTypes = {
	id: PropTypes.string.isRequired,
	itemType: PropTypes.oneOf(['document', 'event', 'stakeholder', 'location']).isRequired,
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
