import React from 'react';
import PropTypes from 'prop-types';
import { Container } from './styles';

const Tag = ({ children }) => (
	<Container>
		{children}
	</Container>
);

Tag.propTypes = {
	children: PropTypes.string.isRequired,
};

export default Tag;
