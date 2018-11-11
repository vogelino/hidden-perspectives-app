import { getDifferenceInWeeks } from './dateUtil';
import { TIMELINE_EVENT_HEIGHT } from '../state/constants';

export const getTimelineHeightByDates = (...dates) => {
	const diffInWeeks = Math.abs(getDifferenceInWeeks(...dates));
	return diffInWeeks * TIMELINE_EVENT_HEIGHT;
};

export const roundToUnit = (value) => value - (value % TIMELINE_EVENT_HEIGHT);
