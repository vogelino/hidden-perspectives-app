import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import 'normalize.css/normalize.css';
import client from './state/client';
import App from './components/App';
import './fonts.css';
import './index.css';

ReactDOM.render(
	(
		<ApolloProvider client={client}>
			<App />
		</ApolloProvider>
	),
	document.getElementById('root'),
);

