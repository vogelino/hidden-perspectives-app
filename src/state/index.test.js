import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { shallow } from 'enzyme';
import Client from '.';

describe('Client', () => {
	it('should contain an ApolloProvider', () => {
		const client = shallow(
			<Client>
				<div />
			</Client>,
		);
		const apolloProvider = client.find(ApolloProvider);
		expect(apolloProvider.length).toBe(1);
	});

	it('should wrap the given children', () => {
		const Element = () => <div />;
		const client = shallow(
			<Client>
				<Element />
			</Client>,
		);
		const element = client.find(Element);
		expect(element.length).toBe(1);
	});
});

