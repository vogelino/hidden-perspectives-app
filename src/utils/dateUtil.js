import { DateUtils } from 'react-day-picker';

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

