import React from 'react';
import PropTypes from 'prop-types';
import { Container, Event, EventsContainer, MultipleEventsPill, SingleEventPill } from './styles';

const MainTimeline = ({
	events,
	height,
}) => (
	<Container>
		<EventsContainer height={height}>
			{events.map((group) => {
				const { id, eventTitle, ...rest } = group[0];
				return (
					<Event {...rest} key={id}>
						{group.length > 1
							? <MultipleEventsPill>{group.length}</MultipleEventsPill>
							: <SingleEventPill />
						}
						{eventTitle.trim() || 'Untitled'}
					</Event>
				);
			})}
		</EventsContainer>
	</Container>
);

MainTimeline.propTypes = {
	events: PropTypes.arrayOf(
		PropTypes.arrayOf(PropTypes.shape({
			id: PropTypes.string.isRequired,
			eventTitle: PropTypes.string.isRequired,
		})),
	),
	height: PropTypes.number,
};

MainTimeline.defaultProps = {
	events: [],
	height: window.innerHeight,
};

export default MainTimeline;
