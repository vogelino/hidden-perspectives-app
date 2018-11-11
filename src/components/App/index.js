import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Head from '../Head';
import Header from '../Header';
import Theme from '../Theme';
import Home from '../../pages/home';
import Login from '../../pages/login';
import CreatePage from '../../pages/create';

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
				<Header pages={pages} />
				<Route exact path="/" component={Home} />
				{pages.map((page) => <Route key={page.path} {...page} />)}
				<Route exact path="/login" component={Login} />
			</div>
		</Theme>
	</Router>
);

export default App;
