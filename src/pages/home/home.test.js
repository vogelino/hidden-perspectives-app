import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Client from '../../state';
import Home from '.';

it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<Router><Client><Home /></Client></Router>, div);
	ReactDOM.unmountComponentAtNode(div);
});

