import React from 'react';
import PropTypes from 'prop-types';
import { transparentize, lighten } from 'polished';
import { ThemeProvider, css } from 'styled-components';
import { theme as originalTheme } from '@smooth-ui/core-sc';

const colors = {
	primary: '#239F40',
	commonBorderColor: originalTheme.gray300,
};

const selectTheme = {
	colors: {
		...colors,
		primary75: lighten(0.1, colors.primary),
		primary50: lighten(0.1, colors.primary),
		primary25: lighten(0.55, colors.primary),
		danger: originalTheme.red,
		dangerLight: lighten(0.1, originalTheme.red),
		neutral0: originalTheme.white,
		neutral5: originalTheme.gray100,
		neutral10: originalTheme.gray200,
		neutral20: originalTheme.gray300,
		neutral30: originalTheme.gray400,
		neutral40: originalTheme.gray500,
		neutral50: originalTheme.gray600,
		neutral60: originalTheme.gray700,
		neutral70: originalTheme.gray800,
		neutral80: originalTheme.gray900,
		neutral90: originalTheme.black,
	},
};

const hpTheme = {
	...originalTheme,
	...colors,
	fontFamily: `"HP Sans", ${originalTheme.fontFamily}`,
	selectTheme,
	controlFocus: () => (color = 'primary') => css`
		outline: 0;
		border-color: ${({ theme }) => theme[color]};
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

