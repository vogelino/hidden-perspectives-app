import React from 'react';
import PropTypes from 'prop-types';
import { Container } from './styles';
import Minimap from './Minimap';
import { LoadingContainer } from '../LoadingIndicator/styles';
import LoadingIndicator from '../LoadingIndicator';
import TimelineItems from './TimelineItems';
import Protagonists from './Protagonists';
import { MainTimelineLegend } from '../Legend';

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
	setPinnedElement,
	pinnedElement,
	itemCounts,
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
		<Protagonists
			isLoading={fetchingProtagonists}
			items={bubbleChartItems}
			hoveredElement={hoveredElement}
			setHoveredElement={setHoveredElement}
			pinnedElement={pinnedElement}
			setPinnedElement={setPinnedElement}
		/>
		<MainTimelineLegend {...itemCounts} isLoading={isLoading} />
		<TimelineItems
			timelineItems={timelineItems}
			hoveredElement={hoveredElement}
			setHoveredElement={setHoveredElement}
			pinnedElement={pinnedElement}
			setPinnedElement={setPinnedElement}
		/>
	</Container>
);

MainTimeline.propTypes = {
	timelineItems: TimelineItems.propTypes.timelineItems,
	minimapItems: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.string.isRequired,
		density: PropTypes.number.isRequired,
	})),
	itemCounts: PropTypes.shape({
		eventsCount: PropTypes.number.isRequired,
		documentsCount: PropTypes.number.isRequired,
	}).isRequired,
	bubbleChartItems: Protagonists.propTypes.items,
	hoveredElement: TimelineItems.propTypes.hoveredElement,
	pinnedElement: TimelineItems.propTypes.pinnedElement,
	setHoveredElement: PropTypes.func,
	setPinnedElement: PropTypes.func,
	errors: PropTypes.arrayOf(PropTypes.string),
	isLoading: PropTypes.bool,
	fetchingProtagonists: PropTypes.bool,
	onRef: PropTypes.func,
};

MainTimeline.defaultProps = {
	hoveredElement: TimelineItems.defaultProps.hoveredElement,
	pinnedElement: TimelineItems.defaultProps.pinnedElement,
	setHoveredElement: () => {},
	setPinnedElement: () => {},
	timelineItems: TimelineItems.defaultProps.timelineItems,
	bubbleChartItems: Protagonists.defaultProps.items,
	minimapItems: [],
	errors: [],
	isLoading: true,
	fetchingProtagonists: true,
	onRef: () => {},
};

export default MainTimeline;
