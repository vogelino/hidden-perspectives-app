import styled from 'styled-components';
import { Button as SmoothUiButton } from '@smooth-ui/core-sc';
import { NavLink as ReactRouterLink } from 'react-router-dom';

export const Button = styled(SmoothUiButton)`
	border: 1px solid ${({ theme }) => theme.commonBorderColor};
	background: white;
	font-weight: bold;
	font-size: .875rem;
`;

export const Link = styled(ReactRouterLink)`
	display: inline-block;
`;
