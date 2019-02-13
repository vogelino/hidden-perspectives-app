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

// REMOVE THE PRODUCTION CHECK WHEN YOU PLAN TO INTRODUCE SIGN UP
const isProduction = process && process.env && process.env.NODE_ENV === 'production';

const Header = ({
	isAuthenticated,
}) => (
	<HeaderContainer>
		<Logo to="/">Hidden Perspectives</Logo>
		<Search />
		{!isProduction && (
			!isAuthenticated() ? (
				<UserInfoContainer>
					<LogButton to="/login" exact>
						{'Login'}
					</LogButton>
				</UserInfoContainer>
			) : <UserInfo />
		)}
	</HeaderContainer>
);

Header.propTypes = {
	isAuthenticated: PropTypes.func,
};

Header.defaultProps = {
	isAuthenticated: () => false,
};

export default Header;

