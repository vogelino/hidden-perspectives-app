import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { split, ApolloLink } from 'apollo-link';
import { withClientState } from 'apollo-link-state';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

import { defaults, resolvers } from './resolvers';

const cache = new InMemoryCache();

const stateLink = withClientState({ resolvers, cache, defaults });

const httpLink = new HttpLink({
	uri: process.env.REACT_APP_GRAPHQL_QUERY_API,
});

const subscriptionLink = new WebSocketLink({
	uri: process.env.REACT_APP_GRAPHQL_SUSBSCRIPTION_API,
	options: {
		reconnect: true,
	},
});

const link = split(
	({ query }) => {
		const { kind, operation } = getMainDefinition(query);
		return kind === 'OperationDefinition' && operation === 'subscription';
	},
	subscriptionLink,
	httpLink,
);

const client = new ApolloClient({
	cache,
	link: ApolloLink.from([stateLink, link]),
});

export default client;

