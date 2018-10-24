import React from 'react';
import ReactDOM from 'react-dom';
import Client from '../../state';
import Other from '.';

it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<Client><Other /></Client>, div);
	ReactDOM.unmountComponentAtNode(div);
});

