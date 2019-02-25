import React from 'react';
import PropTypes from 'prop-types';
import NodeInfo from '../NodeInfo';
import Errors from '../Errors';
import { LeftSidebarContent, Sidebar } from './styles';

const NodeSidebar = ({
	item,
	isLoading,
	errors,
	...rest
}) => (
	<Sidebar>
		<Errors errors={errors} />
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
	errors: Errors.propTypes.errors,
};

NodeSidebar.defaultProps = {
	item: undefined,
	isLoading: true,
	errors: Errors.defaultProps.errors,
};

export default NodeSidebar;
