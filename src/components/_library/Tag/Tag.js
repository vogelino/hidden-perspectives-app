import React from 'react';
import PropTypes from 'prop-types';
import { Container, Link } from './styles';

const Tag = ({ path, onClick, children }) => (path ? (
	<Link to={path} onClick={onClick}>
		<Container interactive>
			{children}
		</Container>
	</Link>
) : (
	<Container onClick={onClick} interactive={!!onClick}>
		{children}
	</Container>
));

Tag.propTypes = {
	path: PropTypes.string,
	children: PropTypes.string.isRequired,
	onClick: PropTypes.func,
};

Tag.defaultProps = {
	path: undefined,
	onClick: undefined,
};

export default Tag;
