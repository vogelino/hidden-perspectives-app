import styled from 'styled-components';
import { Button as SmoothUiButton } from '@smooth-ui/core-sc';
import { NavLink } from 'react-router-dom';

const isPrimary = (variant) => (variant === 'primary');

export const Button = styled(SmoothUiButton)`
	font-weight: ${({ theme }) => theme.btnFontWeight};
	font-size: ${({ theme }) => theme.btnFontSize};

	background: ${({ variant, theme }) => (isPrimary(variant)
		? theme.btnPrimaryBackground
		: theme.bthSecondaryBackground
	)};
	color: ${({ variant, theme }) => (isPrimary(variant)
		? theme.btnPrimaryColor
		: theme.bthSecondaryColor
	)};

	border-width: ${({ theme }) => theme.btnBorderWidth};
	border-style: solid;
	border-color: ${({ variant, theme }) => (isPrimary(variant)
		? theme.btnPrimaryBorderColor
		: theme.btnSecondaryBorderColor
	)};
	padding: .6rem 2rem .4rem;

	&,
	&:hover,
	&.active:not(.active):hover,
	&:not(.active):hover {
		text-decoration: none;
	}
`;

export const Link = styled(NavLink)`
	display: inline-block;
`;
