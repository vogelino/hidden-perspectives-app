import React from 'react';
import ReactDOM from 'react-dom';
import Client from '../../state';
import Home from '.';

it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<Client><Home /></Client>, div);
	ReactDOM.unmountComponentAtNode(div);
});

