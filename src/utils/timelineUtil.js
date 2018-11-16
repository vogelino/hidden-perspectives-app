import { pipe, groupBy, prop } from 'ramda';
import { scaleLinear } from 'd3-scale';
import { TIMELINE_EVENT_HEIGHT, MINIMAP_EVENT_HEIGHT } from '../state/constants';

export const toMinimapDots = (minimapItems) => {
	const sortedGroups = minimapItems.sort((a, b) => {
		if (a.length < b.length) return -1;
		if (a.length > b.length) return 1;
		return 0;
	});

	const minimapColorScale = scaleLinear()
		.domain([0, sortedGroups[sortedGroups.length - 1].length])
		.range([1, 0.1, 0]);

	return minimapItems.map((group) => ({
		density: minimapColorScale(group.length),
		id: group[0].id,
		position: group[0].minimapYPosition,
	}));
};

export const groupItemsBy = (list, groupName) => pipe(
	groupBy(prop(groupName)),
	Object.values,
)(list);

const getUnitRouderByUnit = (unit) => (value) => value - (value % unit);
export const roundToTimelineUnit = getUnitRouderByUnit(TIMELINE_EVENT_HEIGHT);
export const roundToMinimapUnit = getUnitRouderByUnit(MINIMAP_EVENT_HEIGHT);
