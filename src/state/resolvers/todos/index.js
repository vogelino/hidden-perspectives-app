export const defaults = {
	visibilityFilter: 'SHOW_ALL',
};

export const resolvers = {
	setVisibilityFilter: (_, { filter }, { cache }) => {
		cache.writeData({ data: { visibilityFilter: filter } });
		return null;
	},
};

export default { defaults, resolvers };

