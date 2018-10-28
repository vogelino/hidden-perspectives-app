import React from 'react';
import PropTypes from 'prop-types';
import { AUTH_TOKEN } from '../../state/constants';
import { HeaderContainer, HeaderLink, LogButton } from './styles';

const Header = ({
	pages,
	isAuthenticated,
}) => (
	<HeaderContainer>
		{pages.map(({ title, path }) => (
			<HeaderLink to={path} key={path}>
				{title}
			</HeaderLink>
		))}
		{!isAuthenticated ? (
			<LogButton to="/login">
				{'Login'}
			</LogButton>
		) : (
			<LogButton
				to="/"
				onClick={() => {
					localStorage.removeItem(AUTH_TOKEN);
				}}
			>
				{'Logout'}
			</LogButton>
		)}
	</HeaderContainer>
);

Header.defaultProps = {
	isAuthenticated: false,
};

Header.propTypes = {
	pages: PropTypes.arrayOf(PropTypes.shape({
		path: PropTypes.string.isRequired,
		exact: PropTypes.bool.isRequired,
		title: PropTypes.string.isRequired,
	}).isRequired).isRequired,
	isAuthenticated: PropTypes.bool,
};

export default Header;

