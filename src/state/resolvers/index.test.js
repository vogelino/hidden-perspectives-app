import { combineResolver } from '.';

it('should create an object combining all resolvers and defaults', () => {
	const resolver1 = { resolvers: { a: true, b: false, c: 1 }, defaults: { d: true } };
	const resolver2 = { resolvers: { e: false, f: 'bob', g: 2 }, defaults: { h: false } };
	const combinedResolvers = combineResolver(resolver1, resolver2);

	expect(combinedResolvers).toEqual({
		defaults: { d: true, h: false },
		resolvers: {
			Mutation: {
				a: true,
				b: false,
				c: 1,
				e: false,
				f: 'bob',
				g: 2,
			},
		},
	});
});

