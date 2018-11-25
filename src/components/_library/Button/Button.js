import React from 'react';
import PropTypes from 'prop-types';
import { Button, Link } from './styles';

const CustomButton = ({ to, children, ...rest }) => (to ? (
	<Link to={to} {...rest}>
		<Button {...rest}>
			{children}
		</Button>
	</Link>
) : (
	<Button {...rest}>
		{children}
	</Button>
));

CustomButton.propTypes = {
	to: PropTypes.string,
	children: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element,
		PropTypes.node,
	]).isRequired,
};

CustomButton.defaultProps = {
	to: undefined,
};

export default CustomButton;
