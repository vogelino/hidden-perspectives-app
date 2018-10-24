import React from 'react';
import PropTypes from 'prop-types';
import { ApolloProvider } from 'react-apollo';
import client from './client';

const Client = ({ children }) => (
	<ApolloProvider client={client}>{children}</ApolloProvider>
);

Client.propTypes = {
	children: PropTypes.element.isRequired,
};

export default Client;

