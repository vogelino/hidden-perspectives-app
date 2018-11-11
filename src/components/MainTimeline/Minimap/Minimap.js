import React from 'react';
import PropTypes from 'prop-types';
import {
	Content,
	ScrollIndicator,
	Container,
	EventsContainer,
	Event,
	Date,
	DatesContainer,
} from './styles';

const Minimap = ({
	height,
	top,
	events,
	years,
}) => (
	<Container>
		<Content>
			<ScrollIndicator height={height} top={top} />
			<EventsContainer>
				{events.map(({ id, density, position }) => (
					<Event left={16} key={id} top={position} density={density} />
				))}
				{events.map(({ id, density, position }) => (
					<Event left={22} key={id} top={position} density={1 - density} />
				))}
			</EventsContainer>
		</Content>
		<DatesContainer>
			{years.map((year) => <Date key={year}>{year}</Date>)}
		</DatesContainer>
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
	years: PropTypes.arrayOf(PropTypes.string),
};

Minimap.defaultProps = {
	height: 100,
	top: 0,
	events: [],
	years: [
		'1975',
		'1980',
		'1985',
		'1989',
		'1994',
		'1999',
	],
};

export default Minimap;
