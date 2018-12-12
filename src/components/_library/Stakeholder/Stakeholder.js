import React from 'react';
import PropTypes from 'prop-types';
import initials from 'initials';
import { pipe, toUpper } from 'ramda';
import { Container, Circle, Text } from './styles';

const getInitials = pipe(
	initials,
	toUpper,
	(x) => x.substring(0, 2),
);
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
