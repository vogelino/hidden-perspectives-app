// TODO: Put constants in styles
export const dayPadding = 24;
export const dayNodePadding = 16;
export const monthLabelHeight = 36;
export const yearLabelHeight = 40;

/**
 * Estimate text height value. The value to be devided to is dependent on the
 * width of the text node box.
 *
 * @param {String} string
 *
 * @return {Number}
 */
const estimatedTextHight = (string) => Math.ceil(string.length / 43) * 20;

/**
 * Estimate the collection height of documents or events.
 *
 * @param {Array} collection
 *
 * @return {Number}
 */
const estimatedItemCollectionHeight = (collection) => {
	return collection.reduce((acc, cur) => acc + estimatedTextHight(cur.title) + dayNodePadding, 0);
};
