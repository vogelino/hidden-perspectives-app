import React from 'react';
import PropTypes from 'prop-types';
import { HeaderContainer, HeaderLink } from './styles';

const Header = ({ pages }) => (
	<HeaderContainer>
		{pages.map(({ title, path }) => (
			<HeaderLink to={path} key={path}>
				{title}
			</HeaderLink>
		))}
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

