import React from 'react';
import PropTypes from 'prop-types';
import {
	Container,
	MinimapContainer,
	BubbleChartContainer,
	EventContainer,
	Event,
	EventDate,
	Events,
	Documents,
	LegendContainer,
} from './styles';
import OriginalMinimap from './Minimap';
import BubbleChart from '../BubbleChart';
import { LoadingContainer } from '../LoadingIndicator/styles';
import LoadingIndicator from '../LoadingIndicator';
import ContainerWithStickyLabel from './ContainerWithStickyLabel';
import TimelineElement from './TimelineElement';
import { DocumentLegend, EventLegend } from '../Legend';

const isHovered = (currentElementId, hoveredElement) => Boolean(
	hoveredElement && (currentElementId === hoveredElement.id),
);

const TimelineItems = ({
	timelineItems,
	hoveredElement,
	setHoveredElement,
}) => timelineItems.map(({ year, months, ...yearKey }) => (
	<ContainerWithStickyLabel label={year} {...yearKey} isYear>
		{months.map(({ month, days, ...monthKey }) => (
			<ContainerWithStickyLabel label={month} date={`${month} ${year}`} {...monthKey}>
				{days.map(({
					day,
					key,
					events,
					documents,
					...dayKey
				}) => (
					<EventContainer key={key}>
						<Event {...dayKey}>
							<EventDate>{day}</EventDate>
							<Documents>
								{documents.map((item) => (
									<TimelineElement
										key={item.id}
										{...item}
										itemType="document"
										hovered={isHovered(item.id, hoveredElement)}
										hoverHandler={setHoveredElement}
									/>
								))}
							</Documents>
							<Events>
								{events.map((item) => (
									<TimelineElement
										key={item.id}
										{...item}
										itemType="event"
										hovered={isHovered(item.id, hoveredElement)}
										hoverHandler={setHoveredElement}
									/>
								))}
							</Events>
						</Event>
					</EventContainer>
				))}
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
	setHoveredElement: PropTypes.func.isRequired,
};

TimelineItems.defaultProps = {
	hoveredElement: null,
	timelineItems: [],
};


const Legend = () => (
	<LegendContainer>
		<DocumentLegend />
		<EventLegend right />
	</LegendContainer>
);


const Stakholders = (props) => (
	<BubbleChartContainer>
		<BubbleChart
			{...props}
			diameter={250}
			bubblesPadding={5}
		/>
	</BubbleChartContainer>
);

Stakholders.propTypes = {
	items: PropTypes.objectOf(
		PropTypes.arrayOf(
			PropTypes.shape({
				id: PropTypes.string.isRequired,
				stakeholderFullName: PropTypes.string.isRequired,
			}),
		),
	),
	isLoading: PropTypes.bool,
};

Stakholders.defaultProps = {
	items: {},
	isLoading: true,
};


const Minimap = (props) => (
	<MinimapContainer>
		<OriginalMinimap {...props} />
	</MinimapContainer>
);

Minimap.propTypes = {
	isLoading: PropTypes.bool,
	items: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			density: PropTypes.number.isRequired,
		}),
	),
};

Minimap.defaultProps = {
	items: [],
	isLoading: true,
};


const MainTimeline = ({
	timelineItems,
	minimapItems,
	bubbleChartItems,
	errors,
	isLoading,
	fetchingProtagonists,
	onRef,
	setHoveredElement,
	hoveredElement,
}) => (
	<Container id="mainTimeline" ref={onRef}>
		<LoadingContainer isLoading={isLoading}>
			<LoadingIndicator />
		</LoadingContainer>
		{errors.map((error) => error)}
		<Minimap
			isLoading={isLoading}
			items={minimapItems}
		/>
		<Stakholders
			isLoading={fetchingProtagonists}
			items={bubbleChartItems}
		/>
		<Legend />
		<TimelineItems
			timelineItems={timelineItems}
			hoveredElement={hoveredElement}
			setHoveredElement={setHoveredElement}
		/>
	</Container>
);

MainTimeline.propTypes = {
	timelineItems: TimelineItems.propTypes.timelineItems,
	minimapItems: Minimap.propTypes.items,
	bubbleChartItems: Stakholders.propTypes.items,
	hoveredElement: TimelineItems.propTypes.hoveredElement,
	setHoveredElement: PropTypes.func,
	errors: PropTypes.arrayOf(PropTypes.string),
	isLoading: PropTypes.bool,
	fetchingProtagonists: PropTypes.bool,
	onRef: PropTypes.func,
};

MainTimeline.defaultProps = {
	hoveredElement: TimelineItems.defaultProps.hoveredElement,
	setHoveredElement: () => {},
	timelineItems: TimelineItems.defaultProps.timelineItems,
	bubbleChartItems: Stakholders.defaultProps.items,
	minimapItems: Minimap.defaultProps.items,
	errors: [],
	isLoading: true,
	fetchingProtagonists: true,
	onRef: () => {},
};

export default MainTimeline;
