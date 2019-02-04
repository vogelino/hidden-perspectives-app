export const dayPadding = 24;
export const dayNodePadding = 16;
export const monthLabelHeight = 36;
export const yearLabelHeight = 32;

export const estimatedTextHight = (text) => {
	if (text.length < 40) return 20;
	if (text.length < 80) return 40;
	return 65;
};

/**
 * Estimate a days height value.
 * @param {Array} day
 *
 * @return {Number}
 */

export const estimatedDayHight = (day) => {
	const { events, documents } = day;

	// Get the data that is likely the one with the bigger height value.
	const data = documents.length > events.length ? documents : events;

	// If there are no documents return 0 height.
	if (data.length === 0) return 0;

	const blockHeightWithoutPadding = data.reduce((acc, cur) => {
		return acc + estimatedTextHight(cur.title) + dayNodePadding;
	}, 0);

	return blockHeightWithoutPadding + 2 * dayPadding;
};

/**
 * Estimate a months height value.
 * @param {Array} month
 *
 * @return {Number}
 */

export const estimatedMonthHeight = (month) => {
	// TODO: find out why sometimes there is no data;
	if (!month) return 0;

	const { days } = month;

	let height = 0;

	if (month.dateUnitIndex === 1) {
		height += yearLabelHeight;
	}

	if (month.days.length === 0) {
		height -= 24;
	}
	// If the month has no data, return only its labels hight.
	if (days.length === 0) return monthLabelHeight + height;

	const blockHeight = days.reduce((acc, cur) => {
		return acc + estimatedDayHight(cur);
	}, 0);

	return blockHeight + monthLabelHeight + height;
};
