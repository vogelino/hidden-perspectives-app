import React from 'react';
import ReactDOM from 'react-dom';
import Client from '../../state';
import DocumentPage from '.';

it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<Client><DocumentPage /></Client>, div);
	ReactDOM.unmountComponentAtNode(div);
});

