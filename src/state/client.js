import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { withClientState } from 'apollo-link-state';
import { HttpLink } from 'apollo-link-http';

import { defaults, resolvers } from './resolvers';

const cache = new InMemoryCache();

const stateLink = withClientState({ resolvers, cache, defaults });

const client = new ApolloClient({
	cache,
	link: ApolloLink.from([stateLink, new HttpLink()]),
});

export default client;

