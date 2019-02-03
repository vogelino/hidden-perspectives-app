import React from 'react';
import PropTypes from 'prop-types';
import { Container } from './styles';
import Minimap from './Minimap';
import { LoadingContainer } from '../LoadingIndicator/styles';
import LoadingIndicator from '../LoadingIndicator';
import TimelineItems from './TimelineItems';
import Stakeholders from './Stakeholders';
import { MainTimelineLegend } from '../Legend';

const parseTimelineItems = (years) => {
	const months = years.reduce((acc, cur) => {
		if (!cur.months) return acc;
		return [...acc, ...cur.months];
	}, []);

	return months;
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
		<Minimap isLoading={isLoading} items={minimapItems} />
		<Stakeholders
			isLoading={fetchingProtagonists}
			items={bubbleChartItems}
			hoveredElement={hoveredElement}
			setHoveredElement={setHoveredElement}
		/>
		<MainTimelineLegend />
		{timelineItems.length > 0 && (
			<TimelineItems
				timelineItems={parseTimelineItems(timelineItems)}
				hoveredElement={hoveredElement}
				setHoveredElement={setHoveredElement}
			/>
		)}
	</Container>
);

MainTimeline.propTypes = {
	timelineItems: TimelineItems.propTypes.timelineItems,
	minimapItems: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			density: PropTypes.number.isRequired,
		}),
	),
	bubbleChartItems: Stakeholders.propTypes.items,
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
	bubbleChartItems: Stakeholders.defaultProps.items,
	minimapItems: [],
	errors: [],
	isLoading: true,
	fetchingProtagonists: true,
	onRef: () => {},
};

export default MainTimeline;
