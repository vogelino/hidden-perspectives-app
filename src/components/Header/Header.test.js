import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { shallow } from 'enzyme';
import { pages } from '../App';
import Header from '.';
import { HeaderLink } from './styles';

it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<Router><Header pages={pages} /></Router>, div);
	ReactDOM.unmountComponentAtNode(div);
});

it('should render the same amount of links as given to header', () => {
	const header = shallow(<Header pages={pages} />);
	const links = header.find(HeaderLink);
	expect(links.length).toBe(pages.length);
});

