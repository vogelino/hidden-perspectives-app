import React from 'react';
import PropTypes from 'prop-types';
import { animated } from 'react-spring';

Group.propTypes = {
	top: PropTypes.number,
	left: PropTypes.number,
	transform: PropTypes.string,
	className: PropTypes.string,
	children: PropTypes.any,
};

export default function Group({ top = 0, left = 0, transform, children, key, ...restProps }) {
	return (
		<g
			className={'svg-group'}
			transform={transform || `translate(${left}, ${top})`}
			key={key}
			{...restProps}
		>
			{children}
		</g>
	);
}
