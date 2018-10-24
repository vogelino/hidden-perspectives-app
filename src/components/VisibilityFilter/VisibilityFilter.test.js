import React from 'react';
import ReactDOM from 'react-dom';
import Client from '../../state';
import VisibilityFilter from '.';

it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render((
		<Client>
			<VisibilityFilter visibilityFilter="SHOW_ALL" />
		</Client>
	), div);
	ReactDOM.unmountComponentAtNode(div);
});

