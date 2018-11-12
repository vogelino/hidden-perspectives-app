import React from 'react';
import ReactDOM from 'react-dom';
import Client from '../../state';
import EventPage from '.';

it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<Client><EventPage /></Client>, div);
	ReactDOM.unmountComponentAtNode(div);
});

