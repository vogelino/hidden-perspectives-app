import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from '../Header';
import Home from '../../pages/home';
import About from '../../pages/about';
import Other from '../../pages/other';
import './App.css';

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
		</div>
	</Router>
);

export default App;
