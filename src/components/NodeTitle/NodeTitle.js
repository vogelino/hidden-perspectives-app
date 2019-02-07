import React from 'react';
import PropTypes from 'prop-types';
import { Container, Title, Subtitle } from './styles';

const NodeTitle = ({ symbol, subtitle, title }) => (
	<Container>
		{subtitle && (
			<Subtitle variant="h6">{subtitle}</Subtitle>
		)}
		<Title variant="h4">
			{`${symbol} ${title}`}
		</Title>
	</Container>
);

NodeTitle.propTypes = {
	symbol: PropTypes.string,
	subtitle: PropTypes.string,
	title: PropTypes.string.isRequired,
};

NodeTitle.defaultProps = {
	subtitle: undefined,
	symbol: '',
};

export default NodeTitle;
