import { mergeAll, map, prop } from 'ramda';
import todos from './todos';

export const combineResolver = (...resolverObjects) => {
	const allDefaults = map(prop('defaults'), resolverObjects);
	const allResolvers = map(prop('resolvers'), resolverObjects);
	const defaults = mergeAll(allDefaults);
	const resolvers = { Mutation: mergeAll(allResolvers) };
	return { defaults, resolvers };
};

export const { defaults, resolvers } = combineResolver(
	todos,
);

