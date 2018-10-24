import React from 'react';
import ReactDOM from 'react-dom';
import Client from '../../state';
import App from '.';

it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<Client><App /></Client>, div);
	ReactDOM.unmountComponentAtNode(div);
});

