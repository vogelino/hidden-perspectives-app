import React from 'react';
import PropTypes from 'prop-types';
import {
	Content,
	ScrollIndicator,
	Container,
	EventsContainer,
	Event,
} from './styles';

const Minimap = ({
	height,
	top,
	events,
}) => (
	<Container>
		<Content>
			<ScrollIndicator height={height} top={top} />
			<EventsContainer>
				{events.map(({ id, density, position }) => (
					<Event left={16} key={id} top={position} density={density} />
				))}
				{events.map(({ id, density, position }) => (
					<Event left={24} key={id} top={position} density={1 - density} />
				))}
			</EventsContainer>
		</Content>
	</Container>
);

Minimap.propTypes = {
	height: PropTypes.number,
	top: PropTypes.number,
	events: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.string.isRequired,
		position: PropTypes.number.isRequired,
		density: PropTypes.number.isRequired,
	})),
};

Minimap.defaultProps = {
	height: 100,
	top: 0,
	events: [],
};

export default Minimap;
