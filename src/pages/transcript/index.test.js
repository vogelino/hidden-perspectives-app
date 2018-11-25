import React from 'react';
import ReactDOM from 'react-dom';
import Client from '../../state';
import TranscriptView from '.';

it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<Client><TranscriptView /></Client>, div);
	ReactDOM.unmountComponentAtNode(div);
});

