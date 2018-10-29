import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Head from '../Head';
import Header from '../Header';
import VisibilityFilter from '../VisibilityFilter';
import Home from '../../pages/home';
import About from '../../pages/about';
import Login from '../../pages/login';
import CreatePage from '../../pages/create';

export const pages = [
	{
		path: '/',
		exact: true,
		component: Home,
		title: 'Home',
		requiresAuthentication: false,
	},
	{
		path: '/about',
		exact: true,
		component: About,
		title: 'About',
		requiresAuthentication: false,
	},
	{
		path: '/create',
		exact: true,
		component: CreatePage,
		title: 'Create new',
		requiresAuthentication: true,
		authorizedRoles: ['Editor', 'Admin'],
	},
];

const App = () => (
	<Router>
		<div className="App">
			<Head />
			<Header pages={pages} />
			{pages.map((page) => <Route key={page.path} {...page} />)}
			<Route exact path="/login" component={Login} />
			<VisibilityFilter />
		</div>
	</Router>
);

export default App;
