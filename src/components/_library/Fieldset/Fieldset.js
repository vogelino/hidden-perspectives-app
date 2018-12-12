import React from 'react';
import PropTypes from 'prop-types';
import Headline from '../Headline';
import { Container, Legend } from './styles';

const Fieldset = ({ title, children }) => (
	<Container>
		<Legend>
			<Headline variant="h2">
				{title}
			</Headline>
		</Legend>
		{children}
	</Container>
);

Fieldset.propTypes = {
	title: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
};

export default Fieldset;
