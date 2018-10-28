import React from 'react';
import PropTypes from 'prop-types';
import UserInfo from './UserInfo';
import { AUTH_TOKEN } from '../../state/constants';
import {
	HeaderContainer,
	UserInfoContainer,
	HeaderLink,
	LogButton,
} from './styles';

const Header = ({
	pages,
}) => (
	<HeaderContainer>
		{pages.map(({ title, path }) => (
			<HeaderLink to={path} key={path}>
				{title}
			</HeaderLink>
		))}
		{!localStorage.getItem(AUTH_TOKEN) ? (
			<UserInfoContainer>
				<LogButton to="/login">
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

