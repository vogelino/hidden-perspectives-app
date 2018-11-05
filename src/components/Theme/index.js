import React from 'react';
import PropTypes from 'prop-types';
import { transparentize } from 'polished';
import { ThemeProvider, css } from 'styled-components';
import { theme as originalTheme } from '@smooth-ui/core-sc';

const hpTheme = {
	...originalTheme,
	fontFamily: `"HP Sans", ${originalTheme.fontFamily}`,
	primary: '#239F40',
	controlFocus: () => (color = 'primary') => css`
		outline: 0;
		border-color: ${({ theme }) => theme[color]}
		box-shadow: 0 0 0 2px ${({ theme }) => transparentize(0.8, theme[color])};
	`,
};

const Theme = ({ children }) => (
	<ThemeProvider theme={hpTheme}>
		{children}
	</ThemeProvider>
);

Theme.propTypes = {
	children: PropTypes.element.isRequired,
};

export default Theme;

