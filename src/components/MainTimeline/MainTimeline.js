import React from 'react';
import PropTypes from 'prop-types';
import { findIndex } from 'ramda';
import { Container } from './styles';
import Minimap from './Minimap';
import { LoadingContainer } from '../LoadingIndicator/styles';
import LoadingIndicator from '../LoadingIndicator';
import TimelineItems from './TimelineItems';
import Protagonists from './Protagonists';
import PinNotification from '../PinNotification';
import { MainTimelineLegend } from '../Legend';

const parseTimelineItems = (years) => {
	const months = years.reduce((acc, cur) => {
		if (!cur.months) return acc;
		return [...acc, ...cur.months];
	}, []);

	return months;
};

const getPinNotification = (pinnedElement) => {
	const { itemType } = pinnedElement;
	const title = itemType === 'stakeholder' ? pinnedElement.name : pinnedElement[`${itemType}Title`];
	return <PinNotification title={title} itemType={itemType} />;
};

const MainTimeline = ({
	timelineItems,
	minimapItems,
	bubbleChartItems,
	errors,
	isLoading,
	fetchingProtagonists,
	setHoveredElement,
	hoveredElement,
	setPinnedElement,
	pinnedElement,
	eventsCount,
	documentsCount,
	protagonistsCount,
	activeRowIndex,
	setActiveRowIndex,
	activeYear,
	setActiveYear,
	onTimelineScroll,
}) => {
	const items = parseTimelineItems(timelineItems);
	const PinnedElementNotification = pinnedElement && getPinNotification(pinnedElement);

	return (
		<Container id="mainTimeline">
			<LoadingContainer isLoading={isLoading}>
				<LoadingIndicator />
			</LoadingContainer>
			{errors.map((error) => error)}
			<Minimap
				isLoading={isLoading}
				items={minimapItems}
				activeYear={activeYear}
				activeRowIndex={activeRowIndex}
				onClick={(year) => {
					const indexOfFirstItem = findIndex(({ key }) => key === `${year}-1`, items);
					setActiveRowIndex(indexOfFirstItem);
					setActiveYear(year);
				}}
			/>
			<Protagonists
				isLoading={fetchingProtagonists}
				items={bubbleChartItems}
				hoveredElement={hoveredElement}
				setHoveredElement={setHoveredElement}
				pinnedElement={pinnedElement}
				setPinnedElement={setPinnedElement}
			/>
			<MainTimelineLegend
				isLoading={isLoading}
				eventsCount={eventsCount}
				documentsCount={documentsCount}
				protagonistsCount={protagonistsCount}
			/>
			{items.length > 0 && (
				<TimelineItems
					timelineItems={items}
					hoveredElement={hoveredElement}
					setHoveredElement={setHoveredElement}
					pinnedElement={pinnedElement}
					setPinnedElement={setPinnedElement}
					activeRowIndex={activeRowIndex}
					setActiveYear={setActiveYear}
					onTimelineScroll={onTimelineScroll}
				/>
			)}
			{PinnedElementNotification}
		</Container>
	);
};

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
	pinnedElement: TimelineItems.propTypes.pinnedElement,
	setHoveredElement: PropTypes.func,
	setPinnedElement: PropTypes.func,
	errors: PropTypes.arrayOf(PropTypes.string),
	isLoading: PropTypes.bool,
	fetchingProtagonists: PropTypes.bool,
	onTimelineScroll: PropTypes.func,
	setActiveRowIndex: PropTypes.func,
	activeRowIndex: PropTypes.number,
	setActiveYear: PropTypes.func,
	activeYear: PropTypes.string,
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
	onTimelineScroll: () => {},
	setActiveRowIndex: () => {},
	setActiveYear: () => {},
	activeRowIndex: 300,
	activeYear: '1993',
};

export default MainTimeline;
