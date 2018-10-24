import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from '../Header';
import VisibilityFilter from '../VisibilityFilter';
import Home from '../../pages/home';
import About from '../../pages/about';
import Other from '../../pages/other';

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
	{
		path: '/other',
		exact: true,
		component: Other,
		title: 'Other',
	},
];

const App = () => (
	<Router>
		<div className="App">
			<Header pages={pages} />
			<div className="AppContent">
				{pages.map((page) => <Route key={page.path} {...page} />)}
			</div>
			<VisibilityFilter />
		</div>
	</Router>
);

export default App;
