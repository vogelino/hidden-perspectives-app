import { getDifferenceInDays } from './dateUtil';
import { TIMELINE_EVENT_HEIGHT } from '../state/constants';

export const getTimelineHeightByDates = (...dates) => {
	const diffInDays = Math.abs(getDifferenceInDays(...dates));
	return diffInDays * TIMELINE_EVENT_HEIGHT;
};

export const roundToUnit = (value) => value - (value % TIMELINE_EVENT_HEIGHT);
