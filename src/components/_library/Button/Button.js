import React from 'react';
import PropTypes from 'prop-types';
import { Button } from './styles';

const CustomButton = ({
	to,
	children,
	primary,
	className,
	history,
	onClick,
}) => (to ? (
	<Button
		variant={primary ? 'primary' : 'light'}
		className={className}
		onClick={(evt) => {
			history.push(to);
			if (onClick) onClick(evt);
		}}
	>
		{children}
	</Button>
) : (
	<Button
		variant={primary ? 'primary' : 'light'}
		className={className}
		onClick={onClick}
	>
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
	history: PropTypes.shape({
		push: PropTypes.func.isRequired,
	}).isRequired,
	onClick: PropTypes.func,
};

CustomButton.defaultProps = {
	to: undefined,
	primary: false,
	className: '',
	onClick: undefined,
};

export default CustomButton;
