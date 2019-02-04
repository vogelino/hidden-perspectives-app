import React from 'react';
import PropTypes from 'prop-types';
import { lighten, transparentize } from 'polished';
import { ThemeProvider, css } from 'styled-components';
import { theme as originalTheme, th } from '@smooth-ui/core-sc';

const colors = {
	primary: '#1B3C61',
	primaryLight: '#FFD18B',
	primaryDark: '#8F4B00',
	primaryDark10: '#FFC784',
	primaryDark25: '#FFB96F',
	commonBorderColor: originalTheme.gray300,
	usBlue: '#2523A0',
	usRed: '#D7062C',
	iranGreen: '#2523A0',
	iranRed: '#D7062C',
};

const selectTheme = {
	colors: {
		...colors,
		primary75: lighten(0.1, colors.primary),
		primary50: lighten(0.1, colors.primary),
		primary25: colors.primaryLight,
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

const buttons = {
	btnPaddingX: '2rem',
	btnPaddingY: '.5rem',
	btnFontSize: '.875rem',
	btnLineHeight: '.875rem',
	btnBorderWidth: '1px',
	btnPrimaryFontWeight: 'bold',
	btnSecondaryFontWeight: 'inherit',
	btnPrimaryBackground: colors.primary,
	btnSecondaryBackground: 'none',
	btnPrimaryColor: 'white',
	btnSecondaryColor: colors.black,
	btnPrimaryBorderColor: colors.primary,
	btnSecondaryBorderColor: colors.commonBorderColor,
};

const typography = {
	fontFamily: `"Suisse Intl", ${originalTheme.fontFamily}`,
	h1FontSize: '2.5rem',
	h2FontSize: '2rem',
	h3FontSize: '1.75rem',
	h4FontSize: '1.5rem',
	h5FontSize: '1.125rem',
	h6FontSize: '1rem',
};

const hpTheme = {
	...originalTheme,
	...colors,
	...typography,
	...buttons,
	selectTheme,
	controlFocus: () => (baseColor = 'primary') => css`
		outline: 0;
		box-shadow: 0 0 .5rem ${th(baseColor, (color) => transparentize(0.6, color))},
			0 0 0 1px ${th(baseColor)};
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

