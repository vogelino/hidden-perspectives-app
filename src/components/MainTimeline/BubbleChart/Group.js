import React from 'react';
import PropTypes from 'prop-types';

export default function Group({
	top = 0, left = 0, transform, children, key, ...restProps
}) {
	return (
		<g
			className="svg-group"
			transform={transform || `translate(${left}, ${top})`}
			key={key}
			{...restProps}
		>
			{children}
		</g>
	);
}

Group.propTypes = {
	top: PropTypes.number.isRequired,
	left: PropTypes.number.isRequired,
	transform: PropTypes.string.isRequired,
	className: PropTypes.string.isRequired,
	key: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
};
