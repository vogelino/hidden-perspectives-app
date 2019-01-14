import {
	pipe,
	isEmpty,
	prepend,
	take,
	drop,
	curry,
	groupBy,
	prop,
	sort,
} from 'ramda';
import { scaleLinear } from 'd3-scale';
import { TIMELINE_EVENT_HEIGHT, MINIMAP_EVENT_HEIGHT } from '../state/constants';

const groupsOf = curry(function group(n, list) {
	return isEmpty(list) ? [] : prepend(take(n, list), group(n, drop(n, list)));
});

export const getMinimap = (timelineItems) => {
	const allMonths = timelineItems.reduce((acc, { months }) => [...acc, ...months], []);
	const groupedMonts = groupsOf(6, allMonths);
	const getEventsAndDocumentsLength = ({ events, documents }) => (
		events.length + documents.length
	);
	const monthGoups = groupedMonts.map((monthsGroup) => {
		const months = monthsGroup.map(prop('key'));
		const count = monthsGroup.reduce((acc2, { days }) => (
			acc2 + days.reduce((acc3, day) => (
				acc3 + getEventsAndDocumentsLength(day)
			), 0)
		), 0);
		return { months, count };
	});
	const sortedMonths = sort((a, b) => {
		if (a.count < b.count) return -1;
		if (a.count > b.count) return 1;
		return 0;
	}, monthGoups);

	const minimapColorScale = scaleLinear()
		.domain([0, sortedMonths[sortedMonths.length - 1].count])
		.range([1, 0.1, 0]);

	return monthGoups.map(({ months, count }) => ({
		density: minimapColorScale(count),
		id: months.join('-'),
	}));
};

export const groupItemsBy = (list, groupName) => pipe(
	groupBy(prop(groupName)),
	Object.values,
)(list);

const getUnitRouderByUnit = (unit) => (value) => value - (value % unit);
export const roundToTimelineUnit = getUnitRouderByUnit(TIMELINE_EVENT_HEIGHT);
export const roundToMinimapUnit = getUnitRouderByUnit(MINIMAP_EVENT_HEIGHT);

export const isInViewport = (element, offset = 0) => {
	if (!element) return false;
	const { top, bottom } = element.getBoundingClientRect();
	const topIsAboveUpperBound = (top + offset) < 0;
	const bottomIsAboveUpperBound = (bottom + offset) < 0;
	const topIsUnderLowerBound = (top + offset) > window.innerHeight;
	const bottomIsUnderLowerBound = (bottom + offset) > window.innerHeight;
	const isFullyOutOfTheView = (topIsAboveUpperBound && bottomIsAboveUpperBound)
		|| (topIsUnderLowerBound && bottomIsUnderLowerBound);
	return !isFullyOutOfTheView;
};

const isDocumentHovered = (item, hoveredElement) => {
	if (hoveredElement.itemType === 'event') return false;
	return !!item
		.mentionedStakeholders.find(({ id }) => id === hoveredElement.id);
};

const isEventHovered = (item, hoveredElement) => {
	if (hoveredElement.itemType === 'document') return false;
	return !!item
		.eventStakeholders.find(({ id }) => id === hoveredElement.id);
};

const isStakeholderHovered = (item, hoveredElement) => {
	if (hoveredElement.itemType === 'document') {
		return !!hoveredElement
			.mentionedStakeholders.find(({ id }) => id === item.id);
	}
	if (hoveredElement.itemType === 'event') {
		return !!hoveredElement
			.eventStakeholders.find(({ id }) => id === item.id);
	}
	return false;
};

export const isHovered = (item, hoveredElement, itemType) => {
	if (!hoveredElement) return false;
	if (itemType === hoveredElement.itemType) return item.id === hoveredElement.id;
	switch (itemType) {
	case 'document': return isDocumentHovered(item, hoveredElement);
	case 'event': return isEventHovered(item, hoveredElement);
	case 'stakeholder': return isStakeholderHovered(item, hoveredElement);
	default: return false;
	}
};
