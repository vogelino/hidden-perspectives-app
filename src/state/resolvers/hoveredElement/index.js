import { getHoveredElement } from '../../queries/hoveredElement';
import { getCacheWriter } from '../../../utils/cacheUtil';

const writeInCache = getCacheWriter('hoveredElement', getHoveredElement);

export const defaults = {
	hoveredElement: {
		id: null,
		itemType: null,
		__typename: 'HoveredElement',
	},
};

export const resolvers = {
	setHoveredElement: (_, { id, itemType }, { cache }) => {
		writeInCache(cache, { id, itemType });
		return { id, itemType };
	},
};

export default { defaults, resolvers };
