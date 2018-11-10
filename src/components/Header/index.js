import React from 'react';
import PropTypes from 'prop-types';
import UserInfo from './UserInfo';
import { isAuthenticated, isAuthorized } from '../../utils/localStorageUtil';
import {
	HeaderContainer,
	UserInfoContainer,
	HeaderLink,
	LogButton,
	Logo,
} from './styles';

const Header = ({
	pages,
}) => (
	<HeaderContainer>
		<Logo to="/">Hidden Perspectives</Logo>
		{pages.filter(({ requiresAuthentication, authorizedRoles }) => (
			(isAuthenticated() && isAuthorized(authorizedRoles))
			|| !requiresAuthentication
		)).map(({ title, path }) => (
			<HeaderLink
				to={path}
				key={path}
				activeClassName="active"
				exact
			>
				{title}
			</HeaderLink>
		))}
		{!isAuthenticated() ? (
			<UserInfoContainer>
				<LogButton to="/login" exact>
					{'Login'}
				</LogButton>
			</UserInfoContainer>
		) : <UserInfo />}
	</HeaderContainer>
);

Header.propTypes = {
	pages: PropTypes.arrayOf(PropTypes.shape({
		path: PropTypes.string.isRequired,
		exact: PropTypes.bool.isRequired,
		title: PropTypes.string.isRequired,
	}).isRequired).isRequired,
};

export default Header;

