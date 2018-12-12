import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { shallow } from 'enzyme';
import { pages } from '../App';
import Header from './Header';
import { HeaderLink } from './styles';
import { isAuthorized, isAuthenticated } from '../../utils/localStorageUtil';

jest.mock('../../utils/localStorageUtil');

beforeEach(() => {
	isAuthenticated.mockClear();
});

it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<Router><Header pages={pages} /></Router>, div);
	ReactDOM.unmountComponentAtNode(div);
});

it('should render the same amount of links as given to header', () => {
	isAuthenticated.mockImplementation(() => true);
	isAuthorized.mockImplementation(() => true);
	const header = shallow(
		<Header
			pages={pages}
			isAuthenticated={() => true}
			isAuthorized={() => true}
		/>,
	);
	const links = header.find(HeaderLink);
	expect(links.length).toBe(pages.length);
});

it('should only render links that do not require to be authenticated if logged out', () => {
	isAuthenticated.mockImplementation(() => false);
	isAuthorized.mockImplementation(() => false);
	const header = shallow(<Header pages={pages} />);
	const links = header.find(HeaderLink);
	expect(links.length).toBe(
		pages.filter(({ requiresAuthentication }) => !requiresAuthentication).length,
	);
});

it('should only render links that are authorized if logged in', () => {
	isAuthenticated.mockImplementation(() => true);
	isAuthorized.mockImplementation(() => false);
	const header = shallow(<Header pages={pages} />);
	const links = header.find(HeaderLink);
	expect(links.length).toBe(
		pages.filter(({ authorizedRoles }) => !authorizedRoles).length,
	);
});

