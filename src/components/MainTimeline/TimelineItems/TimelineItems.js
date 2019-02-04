import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'react-virtualized';
import throttle from 'lodash.throttle';
import TimelineElement from '../TimelineElement';
import { isHovered } from '../../../utils/timelineUtil';
import { monthsLabels } from '../../../utils/dateUtil';
import {
	EventContainer, Event, EventDate, Events, Documents, Year,
} from './styles';
import { estimatedMonthHeight } from './utils';
import ContainerWithStickyLabel from '../ContainerWithStickyLabel';

class TimelineItemsClass extends React.Component {
	constructor(props) {
		super(props);

		this.updateStakeholders = throttle(this.updateStakeholders, 200);
		this.rowRenderer = this.rowRenderer.bind(this);
	}

	updateStakeholders = ({ startIndex, stopIndex }) => {
		const data = this.props.timelineItems.slice(startIndex, stopIndex);
		const protagonists = {};

		data.forEach((month) => {
			month.days.forEach((day) => {
				const items = [...day.events, ...day.documents];
				if (items.length === 0) return;

				items.forEach((item) => {
					if (!item.mentionedStakeholders) return;
					item.mentionedStakeholders.forEach(({ stakeholderFullName, id }) => {
						if (protagonists[stakeholderFullName]) {
							protagonists[stakeholderFullName].value += 1;
						} else {
							protagonists[stakeholderFullName] = {
								value: 1,
								id,
							};
						}
					});
				});
			});
		});
	};

	rowRenderer({ index, key, style }) {
		const {
			hoveredElement, setHoveredElement, pinnedElement, setPinnedElement,
		} = this.props;
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
				pinned={!hoveredElement && isHovered(item, pinnedElement, itemType)}
				clickHandler={(pinEl) => {
					if (pinnedElement && pinEl.id === pinnedElement.id) {
						return setPinnedElement(null);
					}
					return setPinnedElement(pinEl);
				}}
			/>
		);

		return (
			<div style={style} key={key}>
				{dateUnitIndex === 1 && (
					<Year>
						{data.key.split('-')[0]}
					</Year>
				)}
				<ContainerWithStickyLabel
					isEmpty={days.length === 0}
					label={monthLabel}
					date={`${monthLabel} ${year}`}
				>
					{days.map(({
						dateUnitIndex: dayIndex,
						key: dayKey,
						events,
						documents,
					}) => (
						<EventContainer key={dayKey}>
							<Event>
								<EventDate>{dayIndex}</EventDate>
								<Documents>
									{documents.map(mapTimelineItem('document'))}
								</Documents>
								<Events>{events.map(mapTimelineItem('event'))}</Events>
							</Event>
						</EventContainer>
					))}
				</ContainerWithStickyLabel>
			</div>
		);
	}

	render() {
		return (
			<List
				height={1200}
				overscanRowCount={0}
				rowHeight={({ index }) => estimatedMonthHeight(this.props.timelineItems[index])}
				rowRenderer={this.rowRenderer}
				onRowsRendered={this.updateStakeholders}
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

TimelineItemsClass.defaultProps = {
	hoveredElement: null,
	pinnedElement: null,
	timelineItems: [],
	setHoveredElement: () => {},
	setPinnedElement: () => {},
};

export default TimelineItemsClass;
