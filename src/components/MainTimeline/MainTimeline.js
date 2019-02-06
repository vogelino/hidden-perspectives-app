import React from 'react';
import PropTypes from 'prop-types';
import { Container } from './styles';
import Minimap from './Minimap';
import { LoadingContainer } from '../LoadingIndicator/styles';
import LoadingIndicator from '../LoadingIndicator';
import TimelineItems from './TimelineItems';
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
	errors,
	isLoading,
	setHoveredElement,
	hoveredElement,
	setPinnedElement,
	pinnedElement,
	eventsCount,
	documentsCount,
	protagonistsCount,
}) => (
	<Container id="mainTimeline">
		<LoadingContainer isLoading={isLoading}>
			<LoadingIndicator />
		</LoadingContainer>
		{errors.map((error) => error)}
		<Minimap isLoading={isLoading} items={minimapItems} />
		<MainTimelineLegend
			isLoading={isLoading}
			eventsCount={eventsCount}
			documentsCount={documentsCount}
			protagonistsCount={protagonistsCount}
		/>
		{timelineItems.length > 0 && (
			<TimelineItems
				timelineItems={parseTimelineItems(timelineItems)}
				hoveredElement={hoveredElement}
				setHoveredElement={setHoveredElement}
				pinnedElement={pinnedElement}
				setPinnedElement={setPinnedElement}
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
	eventsCount: PropTypes.number.isRequired,
	documentsCount: PropTypes.number.isRequired,
	protagonistsCount: PropTypes.number.isRequired,
	hoveredElement: TimelineItems.propTypes.hoveredElement,
	pinnedElement: TimelineItems.propTypes.pinnedElement,
	setHoveredElement: PropTypes.func,
	setPinnedElement: PropTypes.func,
	errors: PropTypes.arrayOf(PropTypes.string),
	isLoading: PropTypes.bool,
};

MainTimeline.defaultProps = {
	hoveredElement: TimelineItems.defaultProps.hoveredElement,
	pinnedElement: TimelineItems.defaultProps.pinnedElement,
	setHoveredElement: () => {},
	setPinnedElement: () => {},
	timelineItems: TimelineItems.defaultProps.timelineItems,
	minimapItems: [],
	errors: [],
	isLoading: true,
};

export default MainTimeline;
