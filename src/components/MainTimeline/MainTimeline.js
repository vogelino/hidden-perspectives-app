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
	eventsCount,
	documentsCount,
	protagonistsCount,
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
		/>
		<MainTimelineLegend
			isLoading={isLoading}
			eventsCount={eventsCount}
			documentsCount={documentsCount}
			protagonistsCount={protagonistsCount}
		/>
		<TimelineItems
			timelineItems={timelineItems}
			hoveredElement={hoveredElement}
			setHoveredElement={setHoveredElement}
		/>
	</Container>
);

MainTimeline.propTypes = {
	timelineItems: TimelineItems.propTypes.timelineItems,
	minimapItems: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.string.isRequired,
		density: PropTypes.number.isRequired,
	})),
	eventsCount: PropTypes.number.isRequired,
	documentsCount: PropTypes.number.isRequired,
	protagonistsCount: PropTypes.number.isRequired,
	bubbleChartItems: Protagonists.propTypes.items,
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
	bubbleChartItems: Protagonists.defaultProps.items,
	minimapItems: [],
	errors: [],
	isLoading: true,
	fetchingProtagonists: true,
	onRef: () => {},
};

export default MainTimeline;
