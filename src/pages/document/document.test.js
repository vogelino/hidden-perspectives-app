import React from 'react';
import ReactDOM from 'react-dom';
import Client from '../../state';
import DocumentPage from '.';

const match = {
	params: { id: 'bob' },
};

it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<Client><DocumentPage match={match} /></Client>, div);
	ReactDOM.unmountComponentAtNode(div);
});

