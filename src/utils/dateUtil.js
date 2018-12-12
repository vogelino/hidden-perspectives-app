import { DateUtils } from 'react-day-picker';
import differenceInYears from 'date-fns/difference_in_years';
import format from 'date-fns/format';

export const isSameDayAsToday = (day) => DateUtils.isSameDay(day, new Date());
export const isTodayOrPrior = (day) => DateUtils.isPastDay(day) || isSameDayAsToday(day);
export const isTodayOrAfter = (day) => DateUtils.isFutureDay(day) || isSameDayAsToday(day);

export const ensureTwoDigits = (digit) => (`0${digit}`).slice(-2);
export const getFormattedDate = (originalDate) => {
	const date = originalDate instanceof Date ? originalDate : new Date(originalDate);
	const year = date.getFullYear();
	const month = ensureTwoDigits(date.getMonth() + 1);
	const day = ensureTwoDigits(date.getDate());
	return `${year}-${month}-${day}`;
};

export const getDifferenceInYears = (...dates) => Math.abs(differenceInYears(...dates));

export const formatYear = (date) => format(date, 'YYYY');
