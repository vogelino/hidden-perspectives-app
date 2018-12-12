import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Head from '../Head';
import Header from '../Header';
import Theme from '../Theme';
import Home from '../../pages/home';
import Login from '../../pages/login';
import CreatePage from '../../pages/create';
import DocumentPage from '../../pages/document';
import EventPage from '../../pages/event';
import DocumentMetadataPage from '../../pages/documentMetadata';
import TranscriptPage from '../../pages/transcript';
import { isAuthenticated, isAuthorized } from '../../utils/localStorageUtil';

export const pages = [
	{
		path: '/create',
		exact: true,
		component: CreatePage,
		title: '+ New document',
		requiresAuthentication: true,
		authorizedRoles: ['Editor', 'Admin'],
	},
];

const App = () => (
	<Router>
		<Theme>
			<div className="App">
				<Head />
				<Header
					pages={pages}
					isAuthenticated={isAuthenticated}
					isAuthorized={isAuthorized}
				/>
				<Route exact path="/" component={Home} />
				{pages.map((page) => <Route key={page.path} {...page} />)}
				<Route exact path="/document/context/:id" component={DocumentPage} />
				<Route exact path="/document/transcript/:id" component={TranscriptPage} />
				<Route exact path="/document/metadata/:id" component={DocumentMetadataPage} />
				<Route exact path="/document/metadata/:id/edit" component={() => null} />
				<Route exact path="/event/context/:id" component={EventPage} />
				<Route exact path="/event/metadata/:id" component={() => null} />
				<Route exact path="/event/metadata/:id/edit" component={() => null} />
				<Route exact path="/login" component={Login} />
			</div>
		</Theme>
	</Router>
);

export default App;
