import React from 'react';
import PropTypes from 'prop-types';
import {
	Container,
	MinimapContainer,
	BubbleChartContainer,
	LegendContainer,
} from './styles';
import OriginalMinimap from './Minimap';
import BubbleChart from '../BubbleChart';
import { LoadingContainer } from '../LoadingIndicator/styles';
import LoadingIndicator from '../LoadingIndicator';
import TimelineItems from './TimelineItems';
import { DocumentLegend, EventLegend } from '../Legend';


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
