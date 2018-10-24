import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Header = ({ pages }) => (
	<div>
		{pages.map(({ title, path }) => (
			<Link to={path} key={path}>
				<button type="button">{title}</button>
			</Link>
		))}
	</div>
);

Header.propTypes = {
	pages: PropTypes.arrayOf(PropTypes.shape({
		path: PropTypes.string.isRequired,
		exact: PropTypes.bool.isRequired,
		title: PropTypes.string.isRequired,
	}).isRequired).isRequired,
};

export default Header;

