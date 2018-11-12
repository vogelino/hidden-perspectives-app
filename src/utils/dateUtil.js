import { DateUtils } from 'react-day-picker';
import differenceInDays from 'date-fns/difference_in_days';
import differenceInCalendarWeeks from 'date-fns/difference_in_calendar_weeks';
import differenceInMonths from 'date-fns/difference_in_months';

export const isSameDayAsToday = (day) => DateUtils.isSameDay(day, new Date());
export const isTodayOrPrior = (day) => DateUtils.isPastDay(day) || isSameDayAsToday(day);
export const isTodayOrAfter = (day) => DateUtils.isFutureDay(day) || isSameDayAsToday(day);

const ensureTwoDigits = (digit) => (`0${digit}`).slice(-2);
export const getFormattedDate = (date) => {
	const year = date.getFullYear();
	const month = ensureTwoDigits(date.getMonth() + 1);
	const day = ensureTwoDigits(date.getDate());
	return `${year}-${month}-${day}`;
};

export const getDifferenceInDays = (...dates) => differenceInDays(...dates);
export const getDifferenceInMonths = (...dates) => differenceInMonths(...dates);
export const getDifferenceInWeeks = (...dates) => differenceInCalendarWeeks(...dates);
