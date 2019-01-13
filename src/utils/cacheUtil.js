import { path } from 'ramda';

export const getCacheWriter = (pathKey, query) => (cache, value) => {
	const prevValue = cache.readQuery({ query })[pathKey];
	cache.writeData({ data: { [pathKey]: { ...prevValue, ...value } } });
};

export const getCacheReader = (pathKey, query) => (cache, valueKey) => path(
	[pathKey, valueKey],
	cache.readQuery({ query }),
);
