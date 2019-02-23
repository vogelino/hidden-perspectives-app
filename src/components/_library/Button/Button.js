import React from 'react';
import PropTypes from 'prop-types';
import { Button, Link } from './styles';

const CustomButton = ({
	to,
	children,
	primary,
	className,
	...rest
}) => (to ? (
	<Link to={to} {...rest}>
		<Button {...rest} variant={primary ? 'primary' : 'light'} className={className}>
			{children}
		</Button>
	</Link>
) : (
	<Button {...rest} variant={primary ? 'primary' : 'light'} className={className}>
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
	className: PropTypes.string,
};

CustomButton.defaultProps = {
	to: undefined,
	primary: false,
	className: '',
};

export default CustomButton;
