import styled from 'styled-components';
import { transparentize } from 'polished';
import { components } from 'react-select';

export const Control = styled(components.Control)`
	${({ theme, selectProps }) => (!selectProps.valid && `border-color: ${theme.colors.danger} !important;`)}
	${({ theme, isFocused, selectProps }) => (
		isFocused && (selectProps.valid
			? `box-shadow: 0 0 0 2px ${transparentize(0.8, theme.colors.primary)} !important;`
			: `box-shadow: 0 0 0 2px ${transparentize(0.8, theme.colors.danger)} !important;`
		)
	)}
`;

export const Menu = styled(components.Menu)`
	z-index: 2 !important;
`;
