import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { pages } from '../App';
import Header from '.';

it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<Router><Header pages={pages} /></Router>, div);
	ReactDOM.unmountComponentAtNode(div);
});

