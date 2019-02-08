import React from 'react';
import PropTypes from 'prop-types';
import { getInitialsPair } from '../../../utils/stringUtil';
import {
	Container,
	Circle,
	Text,
	Link,
} from './styles';

const RawStakeholder = ({ children, image }) => (
	<Container>
		<Circle image={image}>{!image && getInitialsPair(children)}</Circle>
		<Text>{children}</Text>
	</Container>
);

const Stakeholder = ({ children, image, to }) => (to ? (
	<Link to={to}>
		<RawStakeholder image={image}>
			{children}
		</RawStakeholder>
	</Link>
) : (
	<RawStakeholder image={image}>
		{children}
	</RawStakeholder>
));

Stakeholder.propTypes = {
	children: PropTypes.string.isRequired,
	to: PropTypes.string,
	image: PropTypes.string,
};

Stakeholder.defaultProps = {
	image: undefined,
	to: undefined,
};

RawStakeholder.propTypes = Stakeholder.propTypes;
RawStakeholder.defaultProps = Stakeholder.defaultProps;

export default Stakeholder;
