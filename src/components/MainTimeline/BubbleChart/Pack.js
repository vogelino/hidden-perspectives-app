import React from 'react';
import PropTypes from 'prop-types';
import { pack as d3pack } from 'd3-hierarchy';
import Group from './Group';

const HierarchyDefaultNode = ({ node }) => (
	<circle cx={node.x} cy={node.y} r={node.r} fill="#21D4FD" />
);

HierarchyDefaultNode.propTypes = {
	node: PropTypes.shape({
		x: PropTypes.number,
		y: PropTypes.number,
		r: PropTypes.number,
		id: PropTypes.string,
	}).isRequired,
};

export default function Pack({
	top,
	left,
	root,
	radius,
	size,
	padding,
	children,
	nodeComponent = HierarchyDefaultNode,
}) {
	const pack = d3pack();

	if (size) pack.size(size);
	if (radius !== undefined) pack.radius(radius);
	if (padding) pack.padding(padding);

	const data = pack(root);

	if (children) return children(data);

	return (
		<Group top={top} left={left} className="svg-pack">
			{nodeComponent
				&& data.descendants().map((node) => (
					<Group key={`pack-node-${node.id}`}>
						{React.createElement(nodeComponent, { node })}
					</Group>
				))}
		</Group>
	);
}

Pack.propTypes = {
	root: PropTypes.shape({}).isRequired,
	children: PropTypes.func.isRequired,
	top: PropTypes.number.isRequired,
	left: PropTypes.number.isRequired,
	radius: PropTypes.func.isRequired,
	size: PropTypes.arrayOf(PropTypes.number).isRequired,
	padding: PropTypes.number.isRequired,
	nodeComponent: PropTypes.func.isRequired,
};
