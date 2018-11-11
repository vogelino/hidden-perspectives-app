import React from 'react';
import {
	Container,
	Circle,
	Event,
	Document,
	Text,
} from './styles';

const LoadingIndicator = () => (
	<Container>
		<Circle>
			<Event />
			<Document />
		</Circle>
		<Text>Loading...</Text>
	</Container>
);

export default LoadingIndicator;
