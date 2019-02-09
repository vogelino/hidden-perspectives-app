import React from 'react';
import PropTypes from 'prop-types';
import { Container, Title, Subtitle } from './styles';

const NodeInfo = ({ symbol, subtitle, title }) => (
	<Container>
		{subtitle && (
			<Subtitle variant="h6">{subtitle}</Subtitle>
		)}
		<Title variant="h4">
			{`${symbol} ${title}`}
		</Title>
	</Container>
);

NodeInfo.propTypes = {
	symbol: PropTypes.string,
	subtitle: PropTypes.string,
	title: PropTypes.string.isRequired,
};

NodeInfo.defaultProps = {
	subtitle: undefined,
	symbol: '',
};

export default NodeInfo;
