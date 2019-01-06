import React from 'react';
import PropTypes from 'prop-types';
import UserInfo from './UserInfo';
import {
	HeaderContainer,
	UserInfoContainer,
	LogButton,
	Logo,
} from './styles';

const Header = ({
	isAuthenticated,
	children,
}) => (
	<HeaderContainer>
		<Logo to="/">Hidden Perspectives</Logo>
		{children}
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
	children: PropTypes.node,
};

Header.defaultProps = {
	isAuthenticated: () => false,
	children: null,
};

export default Header;

