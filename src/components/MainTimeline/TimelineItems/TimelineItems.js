import React from "react";
import PropTypes from "prop-types";
import ContainerWithStickyLabel from "../ContainerWithStickyLabel";
import TimelineElement from "../TimelineElement";
import { isHovered } from "../../../utils/timelineUtil";
import { EventContainer, Event, EventDate, Events, Documents } from "./styles";
import { CellMeasurer, CellMeasurerCache, List } from "react-virtualized";
import { estimatedMonthHeight } from "./utils";

class TimelineItemsClass extends React.Component {
	constructor(props) {
		super(props);
		this._cache = new CellMeasurerCache({
			fixedWidth: false,
			minHeight: 50
		});
	}

	_rowRenderer = ({ index, key, parent, style }) => {
		const { timelineItems } = this.props;
		const data = this.props.timelineItems[index];
		if (!data) return null;
		const { days, events, documents, dayKey, month, year } = data;

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
				<ContainerWithStickyLabel label={month} date={`${month} ${year}`}>
					{days.map(({ day, key, events, documents, ...dayKey }) => {
						return (
							<EventContainer key={key}>
								<Event {...dayKey}>
									<EventDate>{day}</EventDate>
									<Documents>
										{documents.map(mapTimelineItem("document"))}
									</Documents>
									<Events>{events.map(mapTimelineItem("event"))}</Events>
								</Event>
							</EventContainer>
						);
					})}
				</ContainerWithStickyLabel>
			</div>
		);
	};

	render() {
		return (
			<List
				height={1200}
				overscanRowCount={0}
				rowHeight={(index) => {
					return estimatedMonthHeight(this.props.timelineItems[index.index]);
				}}
				rowRenderer={this._rowRenderer}
				rowCount={this.props.timelineItems.length}
				width={800}
			/>
		);
	}
}

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
									date: PropTypes.instanceOf(Date).isRequired
								})
							),
							documents: PropTypes.arrayOf(
								PropTypes.shape({
									id: PropTypes.string.isRequired,
									title: PropTypes.string.isRequired,
									date: PropTypes.instanceOf(Date).isRequired
								})
							)
						})
					).isRequired
				})
			).isRequired
		})
	),
	hoveredElement: PropTypes.shape({
		id: PropTypes.string.isRequired,
		itemType: PropTypes.string.isRequired
	}),
	setHoveredElement: PropTypes.func
};

TimelineItemsClass.defaultProps = {
	hoveredElement: null,
	timelineItems: [],
	setHoveredElement: () => {}
};

export default TimelineItemsClass;
