import React from 'react';
import PropTypes from 'prop-types';
import ContainerWithStickyLabel from '../ContainerWithStickyLabel';
import TimelineElement from '../TimelineElement';
import { isHovered } from '../../../utils/timelineUtil';
import {
	EventContainer,
	Event,
	EventDate,
	Events,
	Documents,
} from './styles';

const TimelineItems = ({
	timelineItems,
	hoveredElement,
	setHoveredElement,
	pinnedElement,
	setPinnedElement,
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
				pinnedElement={pinnedElement}
			>
				{days.map(({
					day,
					key,
					events,
					documents,
					...dayKey
				}) => {
					const mapTimelineItem = (itemType) => (item) => {
						const hovered = isHovered(item, hoveredElement, itemType);
						const pinned = isHovered(item, pinnedElement, itemType);
						return (
							<TimelineElement
								key={item.id}
								{...item}
								itemType={itemType}
								hoveredElement={hoveredElement}
								hovered={hovered}
								pinned={!hoveredElement && pinned}
								hoverHandler={setHoveredElement}
								clickHandler={(pinEl) => {
									if (pinnedElement && pinEl.id === pinnedElement.id) return setPinnedElement(null);
									return setPinnedElement(pinEl);
								}}
							/>
						);
					};
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
	hoveredElement: PropTypes.oneOfType([
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			itemType: PropTypes.string.isRequired,
		}),
		PropTypes.arrayOf(
			PropTypes.shape({
				id: PropTypes.string.isRequired,
				itemType: PropTypes.string.isRequired,
			}),
		),
	]),
	setHoveredElement: PropTypes.func,
	pinnedElement: PropTypes.oneOfType([
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			itemType: PropTypes.string.isRequired,
		}),
		PropTypes.arrayOf(
			PropTypes.shape({
				id: PropTypes.string.isRequired,
				itemType: PropTypes.string.isRequired,
			}),
		),
	]),
	setPinnedElement: PropTypes.func,
};

TimelineItems.defaultProps = {
	hoveredElement: null,
	pinnedElement: null,
	timelineItems: [],
	setHoveredElement: () => {},
	setPinnedElement: () => {},
};

export default TimelineItems;
