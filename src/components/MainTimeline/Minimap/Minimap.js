import React from 'react';
import PropTypes from 'prop-types';
import { lifecycle } from 'recompose';
import {
	Content,
	ScrollIndicator,
	Container,
	EventsContainer,
	Event,
	Date,
	DatesContainer,
} from './styles';

const OptimizedEvents = lifecycle({
	shouldComponentUpdate({ events, documents }) {
		return (
			events.length !== this.props.events.length
			|| documents.length !== this.props.documents.length
		);
	},
})(({ events, documents }) => (
	<EventsContainer>
		{events.map(({ id, density, position }) => (
			<Event left={16} key={id} top={position} density={density} />
		))}
		{documents.map(({ id, density, position }) => (
			<Event left={22} key={id} top={position} density={density} />
		))}
	</EventsContainer>
));

const OptimizedDates = lifecycle({
	shouldComponentUpdate({ years }) {
		return years.length !== this.props.years.length;
	},
})(({ years }) => (
	<DatesContainer>
		{years.map((year) => <Date key={year}>{year}</Date>)}
	</DatesContainer>
));

const Minimap = ({
	height,
	top,
	events,
	documents,
	years,
	isLoading,
}) => (
	<Container>
		<Content>
			{!isLoading && <ScrollIndicator height={height} top={top} />}
			<OptimizedEvents events={events} documents={documents} />
		</Content>
		<OptimizedDates years={years} />
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
	documents: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.string.isRequired,
		position: PropTypes.number.isRequired,
		density: PropTypes.number.isRequired,
	})),
	years: PropTypes.arrayOf(PropTypes.string),
	isLoading: PropTypes.bool,
};

Minimap.defaultProps = {
	isLoading: false,
	height: 100,
	top: 0,
	events: [],
	documents: [],
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
