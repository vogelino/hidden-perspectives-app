import React from 'react';
import PropTypes from 'prop-types';
import NodeInfo from '../NodeInfo';
import { LeftSidebarContent, Sidebar } from './styles';

const NodeSidebar = ({ item, isLoading, ...rest }) => (
	<Sidebar>
		<LeftSidebarContent>
			<NodeInfo item={item} isLoading={isLoading} {...rest} />
		</LeftSidebarContent>
	</Sidebar>
);

NodeSidebar.propTypes = {
	item: PropTypes.shape({
		id: PropTypes.string.isRequired,
	}),
	isLoading: PropTypes.bool,
};

NodeSidebar.defaultProps = {
	item: undefined,
	isLoading: true,
};

export default NodeSidebar;
