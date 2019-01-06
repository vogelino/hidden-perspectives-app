import React from 'react';
import PropTypes from 'prop-types';
import { getInitials } from '../../../utils/stringUtil';
import { Container, Circle, Text } from './styles';

const Stakeholder = ({ children, image }) => (
	<Container>
		<Circle image={image}>{!image && getInitials(children)}</Circle>
		<Text>{children}</Text>
	</Container>
);

Stakeholder.propTypes = {
	children: PropTypes.string.isRequired,
	image: PropTypes.string,
};

Stakeholder.defaultProps = {
	image: undefined,
};

export default Stakeholder;
