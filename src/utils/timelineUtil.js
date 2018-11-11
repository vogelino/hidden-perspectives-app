import { getDifferenceInWeeks } from './dateUtil';
import { TIMELINE_EVENT_HEIGHT, MINIMAP_EVENT_HEIGHT } from '../state/constants';

export const getTimelineHeightByDates = (...dates) => {
	const diffInWeeks = Math.abs(getDifferenceInWeeks(...dates));
	return (diffInWeeks * TIMELINE_EVENT_HEIGHT);
};

const getUnitRouderByUnit = (unit) => (value) => value - (value % unit);
export const roundToTimelineUnit = getUnitRouderByUnit(TIMELINE_EVENT_HEIGHT);
export const roundToMinimapUnit = getUnitRouderByUnit(MINIMAP_EVENT_HEIGHT);
