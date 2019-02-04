import React from 'react';
import PropTypes from 'prop-types';
import UserInfo from './UserInfo';
import Search from '../Search';
import {
	HeaderContainer,
	UserInfoContainer,
	LogButton,
	Logo,
} from './styles';

const Header = ({
	isAuthenticated,
}) => (
	<HeaderContainer>
		<Logo to="/">Hidden Perspectives</Logo>
		<Search />
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
	isAuthenticated: PropTypes.func,
};

Header.defaultProps = {
	isAuthenticated: () => false,
};

export default Header;

