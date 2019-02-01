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

import { CellMeasurer, CellMeasurerCache, List } from 'react-virtualized'

let cache = new CellMeasurerCache({
	fixedWidth: true,
	minHeight: 50,
});

const flattenYears = (year) => {
	year.reduce((acc, cur) => {
		return [...acc, ...cur.months];
	}, []);
}

const padding = 24
const innerPadding = 16

const estimatedTextHight = text => {
	if (text.length < 40) return 20
	if (text.length < 80) return 40
	else return 65
}

const estimateMonthHeight = data => {
	if (!data) return 0
		let height = padding * 2
		const { day, key, documents, events } = data
		const d = documents.length > events.length ? documents : events

		if (d.length === 0) return 0

		
		const l = d.reduce((accd, curd) => {
			return accd + estimatedTextHight(curd.title) + innerPadding
		}, 0)
		
		return l + 2 * padding
}

class TimelineItemsClass extends React.Component {
	constructor(props) {
		super(props);
		this._cache = new CellMeasurerCache({
			fixedWidth: false,
			minHeight: 50,
		})
	}

	_rowRenderer = ({ index, key, parent, style }) => {
		const { timelineItems } = this.props 
		const data = this.props.timelineItems[index]
		if (!data) return null
		const {day, events, documents, dayKey } = data

		const mapTimelineItem = (itemType) => (item) => (
			<TimelineElement
				key={item.id}
				{...item}
				itemType={itemType}
				// hoveredElement={hoveredElement}
				// hovered={isHovered(item, hoveredElement, itemType)}
				// hoverHandler={setHoveredElement}
			/>
		);

		return (
				<div style={style} key={key}>

						<EventContainer>
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
				
				</div>
		)
	}

	shouldComponentUpdate = (nextProps, nextState) => {
	  return false
	}
	

	render() {
		return (
			<List 
				height={1200}
				overscanRowCount={0}
				rowHeight={(index) => {
					return estimateMonthHeight(this.props.timelineItems[index.index])
				}}
				rowRenderer={this._rowRenderer}
				rowCount={this.props.timelineItems.length}
				width={800}
			/>
		)
	}
}

const TimelineItems = ({
	timelineItems,
	hoveredElement,
	setHoveredElement,
}) => timelineItems.map(({ year, months, ...yearKey }) => (
		months.map(({ month, days, ...monthKey }, index) => (
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
							hovered={isHovered(item, hoveredElement, itemType)}
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
		))
));

TimelineItemsClass.propTypes = {
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

TimelineItemsClass.defaultProps = {
	hoveredElement: null,
	timelineItems: [],
	setHoveredElement: () => {},
};

export default TimelineItemsClass;
