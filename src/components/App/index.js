import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Head from '../Head';
import Header from '../Header';
import VisibilityFilter from '../VisibilityFilter';
import Home from '../../pages/home';
import About from '../../pages/about';
import Login from '../../pages/login';
import { AUTH_TOKEN } from '../../state/constants';

export const pages = [
	{
		path: '/',
		exact: true,
		component: Home,
		title: 'Home',
	},
	{
		path: '/about',
		exact: true,
		component: About,
		title: 'About',
	},
];

const App = () => (
	<Router>
		<div className="App">
			<Head />
			<Header
				pages={pages}
				isAuthenticated={Boolean(localStorage.getItem(AUTH_TOKEN))}
			/>
			{pages.map((page) => <Route key={page.path} {...page} />)}
			<Route exact path="/login" component={Login} />
			<VisibilityFilter />
		</div>
	</Router>
);

export default App;
