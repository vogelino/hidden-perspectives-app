import React from 'react';
import PropTypes from 'prop-types';
import {
	Container,
	Event,
	EventsContainer,
	MultipleEventsPill,
	SingleEventPill,
	EventDate,
	EventTitle,
} from './styles';
import { getFormattedDate } from '../../utils/dateUtil';

const MainTimeline = ({
	events,
	height,
}) => (
	<Container>
		<EventsContainer height={height}>
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
						<EventTitle>{eventTitle.trim() || 'Untitled'}</EventTitle>
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
