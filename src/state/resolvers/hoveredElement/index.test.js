import { defaults, resolvers } from '.';

it('should have hoveredElement in the defaults', () => {
	expect(defaults.hoveredElement).toBeDefined();
});

describe('setHoveredElement', () => {
	const expectedHoveredElement = { id: 'a', itemType: 'b' };
	const cache = {
		writeData: jest.fn(),
		readQuery: jest.fn().mockReturnValue({
			hoveredElement: {},
		}),
	};
	const resolverCall = resolvers.setHoveredElement(
		null,
		{ hoveredElement: expectedHoveredElement },
		{ cache },
	);

	it('should write the given hoveredElement as hoveredElement into the cache', () => {
		expect(cache.writeData)
			.toHaveBeenCalledWith({ data: { hoveredElement: expectedHoveredElement } });
	});

	it('should return null', () => {
		expect(resolverCall).toBeNull();
	});
});

