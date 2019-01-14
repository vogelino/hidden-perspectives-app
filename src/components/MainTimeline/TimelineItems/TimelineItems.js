import React from 'react';
import PropTypes from 'prop-types';
import ContainerWithStickyLabel from '../ContainerWithStickyLabel';
import TimelineElement from '../TimelineElement';
import {
	EventContainer,
	Event,
	EventDate,
	Events,
	Documents,
} from './styles';

const isHovered = (item, hoveredElement) => Boolean(
	hoveredElement && (item.id === hoveredElement.id),
);

const TimelineItems = ({
	timelineItems,
	hoveredElement,
	setHoveredElement,
}) => timelineItems.map(({ year, months, ...yearKey }) => (
	<ContainerWithStickyLabel
		label={year}
		{...yearKey}
		isYear
		hoveredElement={hoveredElement}
	>
		{months.map(({ month, days, ...monthKey }) => (
			<ContainerWithStickyLabel
				label={month}
				date={`${month} ${year}`}
				{...monthKey}
				hoveredElement={hoveredElement}
			>
				{days.map(({
					day,
					key,
					events,
					documents,
					...dayKey
				}) => {
					const mapTimelineItem = (itemType) => (item) => (
						<TimelineElement
							key={item.id}
							{...item}
							itemType={itemType}
							hoveredElement={hoveredElement}
							hovered={isHovered(item, hoveredElement)}
							hoverHandler={setHoveredElement}
						/>
					);
					return (
						<EventContainer key={key}>
							<Event {...dayKey}>
								<EventDate>{day}</EventDate>
								<Documents>
									{documents.map(mapTimelineItem('document'))}
								</Documents>
								<Events>
									{events.map(mapTimelineItem('event'))}
								</Events>
							</Event>
						</EventContainer>
					);
				})}
			</ContainerWithStickyLabel>
		))}
	</ContainerWithStickyLabel>
));

TimelineItems.propTypes = {
	timelineItems: PropTypes.arrayOf(
		PropTypes.shape({
			key: PropTypes.string.isRequired,
			year: PropTypes.string.isRequired,
			months: PropTypes.arrayOf(
				PropTypes.shape({
					key: PropTypes.string.isRequired,
					month: PropTypes.string.isRequired,
					days: PropTypes.arrayOf(
						PropTypes.shape({
							key: PropTypes.string.isRequired,
							day: PropTypes.string.isRequired,
							events: PropTypes.arrayOf(
								PropTypes.shape({
									id: PropTypes.string.isRequired,
									title: PropTypes.string.isRequired,
									date: PropTypes.instanceOf(Date).isRequired,
								}),
							),
							documents: PropTypes.arrayOf(
								PropTypes.shape({
									id: PropTypes.string.isRequired,
									title: PropTypes.string.isRequired,
									date: PropTypes.instanceOf(Date).isRequired,
								}),
							),
						}),
					).isRequired,
				}),
			).isRequired,
		}),
	),
	hoveredElement: PropTypes.shape({
		id: PropTypes.string.isRequired,
		itemType: PropTypes.string.isRequired,
	}),
	setHoveredElement: PropTypes.func,
};

TimelineItems.defaultProps = {
	hoveredElement: null,
	timelineItems: [],
	setHoveredElement: () => {},
};

export default TimelineItems;
