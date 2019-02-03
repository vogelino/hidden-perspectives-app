import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'react-virtualized';
import TimelineElement from '../TimelineElement';
import { isHovered } from '../../../utils/timelineUtil';
import { monthsLabels } from '../../../utils/dateUtil';
import { EventContainer, Event, EventDate, Events, Documents } from './styles';
import { estimatedMonthHeight } from './utils';
import ContainerWithStickyLabel from '../ContainerWithStickyLabel';

class TimelineItemsClass extends React.Component {
	constructor(props) {
		super(props);
		this.rowRenderer = this.rowRenderer.bind(this);
	}

	rowRenderer({ index, key, style }) {
		const { hoveredElement, setHoveredElement } = this.props;
		const data = this.props.timelineItems[index];
		if (!data) return null;
		const { days, dateUnitIndex, year } = data;
		const monthLabel = monthsLabels[dateUnitIndex - 1];

		const mapTimelineItem = (itemType) => (item) => (
			<TimelineElement
				key={item.id}
				{...item}
				itemType={itemType}
				hoveredElement={hoveredElement}
				hovered={isHovered(item, hoveredElement, itemType)}
				hoverHandler={setHoveredElement}
			/>
		);

		return (
			<div style={style} key={key}>
				<ContainerWithStickyLabel label={monthLabel} date={`${monthLabel} ${year}`}>
					{days.map(({ dateUnitIndex: dayIndex, key: dayKey, events, documents }) => {
						return (
							<EventContainer key={dayKey}>
								<Event>
									<EventDate>{dayIndex}</EventDate>
									<Documents>
										{documents.map(mapTimelineItem('document'))}
									</Documents>
									<Events>{events.map(mapTimelineItem('event'))}</Events>
								</Event>
							</EventContainer>
						);
					})}
				</ContainerWithStickyLabel>
			</div>
		);
	}

	render() {
		return (
			<List
				height={1200}
				overscanRowCount={0}
				rowHeight={(index) => {
					return estimatedMonthHeight(this.props.timelineItems[index.index]);
				}}
				rowRenderer={this.rowRenderer}
				rowCount={this.props.timelineItems.length}
				width={window.innerWidth - 384}
			/>
		);
	}
}

TimelineItemsClass.propTypes = {
	timelineItems: PropTypes.arrayOf(
		PropTypes.shape({
			key: PropTypes.string.isRequired,
			dateUnitIndex: PropTypes.number.isRequired,
			days: PropTypes.arrayOf(
				PropTypes.shape({
					key: PropTypes.string.isRequired,
					dateUnitIndex: PropTypes.number.isRequired,
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
			),
		}),
	),
	hoveredElement: PropTypes.shape({
		id: PropTypes.string.isRequired,
		itemType: PropTypes.string.isRequired,
	}),
	setHoveredElement: PropTypes.func,
};

TimelineItemsClass.defaultProps = {
	hoveredElement: null,
	timelineItems: [],
	setHoveredElement: () => {},
};

export default TimelineItemsClass;
