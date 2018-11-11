import React from 'react';
import PropTypes from 'prop-types';
import {
	Container,
	Event,
	EventsContainer,
	MultipleEventsPill,
	SingleEventPill,
	EventDate,
	EventTitleContainer,
	EventTitle,
	MinimapContainer,
} from './styles';
import Minimap from './Minimap';
import { getFormattedDate } from '../../utils/dateUtil';

const MainTimeline = ({
	events,
	minimapEvents,
	containerHeight,
	errors,
	isLoading,
}) => (
	<Container id="mainTimeline">
		{isLoading && 'Loading...'}
		{errors.map((error) => (error))}
		<MinimapContainer>
			<Minimap events={minimapEvents} />
		</MinimapContainer>
		<EventsContainer height={containerHeight}>
			{events.map((group) => {
				const {
					id,
					eventTitle,
					eventYPosition,
					eventStartDate,
				} = group[0];
				return (
					<Event style={{ top: `${eventYPosition}px` }} key={id}>
						{group.length > 1
							? <MultipleEventsPill>{group.length}</MultipleEventsPill>
							: <SingleEventPill />
						}
						<EventDate>{getFormattedDate(eventStartDate)}</EventDate>
						<EventTitleContainer>
							<EventTitle>{eventTitle.trim() || 'Untitled'}</EventTitle>
						</EventTitleContainer>
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
	minimapEvents: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.string.isRequired,
		density: PropTypes.number.isRequired,
		position: PropTypes.number.isRequired,
	})),
	containerHeight: PropTypes.number,
	errors: PropTypes.arrayOf(PropTypes.string),
	isLoading: PropTypes.bool,
};

MainTimeline.defaultProps = {
	events: [],
	minimapEvents: [],
	containerHeight: window.innerHeight,
	errors: [],
	isLoading: true,
};

export default MainTimeline;
