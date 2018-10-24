import React from 'react';
import ReactDOM from 'react-dom';
import Client from '../../state';
import About from '.';

it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<Client><About /></Client>, div);
	ReactDOM.unmountComponentAtNode(div);
});

