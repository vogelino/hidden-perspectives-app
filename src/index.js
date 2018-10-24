import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import client from './state/client';
import './index.css';
import App from './components/App';

ReactDOM.render(
	(
		<ApolloProvider client={client}>
			<App />
		</ApolloProvider>
	),
	document.getElementById('root'),
);

