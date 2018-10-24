import { defaults, resolvers } from '.';

it('should have visibilityFilter in the defaults', () => {
	expect(defaults.visibilityFilter).toBeDefined();
});

describe('setVisibilityFilter', () => {
	const expectedFilter = 'TEST';
	const cache = { writeData: jest.fn() };
	const resolverCall = resolvers.setVisibilityFilter(null, { filter: expectedFilter }, { cache });

	it('should write the given filter as visibilityFilter into the cache', () => {
		expect(cache.writeData).toHaveBeenCalledWith({ data: { visibilityFilter: expectedFilter } });
	});

	it('should return null', () => {
		expect(resolverCall).toBeNull();
	});
});

