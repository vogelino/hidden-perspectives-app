import React from 'react';
import PropTypes from 'prop-types';
import { Container, Title, Subtitle } from './styles';

const NodeTitle = ({ subtitle, title }) => (
	<Container>
		{subtitle && <Subtitle variant="h6">{subtitle}</Subtitle>}
		<Title variant="h4">{title}</Title>
	</Container>
);

NodeTitle.propTypes = {
	subtitle: PropTypes.string,
	title: PropTypes.string.isRequired,
};

NodeTitle.defaultProps = {
	subtitle: undefined,
};

export default NodeTitle;
