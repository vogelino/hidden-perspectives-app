import React from 'react';
import PropTypes from 'prop-types';
import { Button, Link } from './styles';

const CustomButton = ({
	to,
	children,
	primary,
	...rest
}) => (to ? (
	<Link to={to} {...rest}>
		<Button {...rest} variant={primary ? 'primary' : 'light'}>
			{children}
		</Button>
	</Link>
) : (
	<Button {...rest}>
		{children}
	</Button>
));

CustomButton.propTypes = {
	primary: PropTypes.bool,
	to: PropTypes.string,
	children: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element,
		PropTypes.node,
	]).isRequired,
};

CustomButton.defaultProps = {
	to: undefined,
	primary: false,
};

export default CustomButton;
