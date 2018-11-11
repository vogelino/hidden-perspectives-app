import { pipe, groupBy, prop } from 'ramda';
import { scaleLinear } from 'd3-scale';
import { getDifferenceInWeeks } from './dateUtil';
import { TIMELINE_EVENT_HEIGHT, MINIMAP_EVENT_HEIGHT } from '../state/constants';

export const getTimelineHeightByDates = (...dates) => {
	const diffInWeeks = Math.abs(getDifferenceInWeeks(...dates));
	return (diffInWeeks * TIMELINE_EVENT_HEIGHT);
};

export const eventsToMinimapDots = (minimapEvents) => {
	const sortedGroups = minimapEvents.sort((a, b) => {
		if (a.length < b.length) return -1;
		if (a.length > b.length) return 1;
		return 0;
	});

	const minimapColorScale = scaleLinear()
		.domain([0, sortedGroups[sortedGroups.length - 1].length])
		.range([1, 0.1, 0]);

	return minimapEvents.map((group) => ({
		density: minimapColorScale(group.length),
		id: group[0].id,
		position: group[0].eventMinimapYPosition,
	}));
};

export const groupEventsBy = (list, groupName) => pipe(
	groupBy(prop(groupName)),
	Object.values,
)(list);

const getUnitRouderByUnit = (unit) => (value) => value - (value % unit);
const roundToTimelineUnit = getUnitRouderByUnit(TIMELINE_EVENT_HEIGHT);
const roundToMinimapUnit = getUnitRouderByUnit(MINIMAP_EVENT_HEIGHT);

export const getYPositionParser = (scaleFunction, minimapScaleFunction) => (date) => {
	const dateInstance = new Date(date);
	const scaledPosition = scaleFunction(dateInstance);
	const eventYPosition = roundToTimelineUnit(scaledPosition);
	return {
		eventYPosition,
		eventMinimapYPosition: roundToMinimapUnit(minimapScaleFunction(scaledPosition)),
	};
};
