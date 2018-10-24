import { ApolloClient } from 'apollo-client';
import client from './client';

it('should return an instance of an ApolloClient', () => {
	expect(client).toBeInstanceOf(ApolloClient);
});

