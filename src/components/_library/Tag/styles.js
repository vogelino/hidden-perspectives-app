import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Container = styled.span`
	border-radius: 1rem;
	background: ${({ theme }) => theme.gray200};
	color: ${({ theme }) => theme.gray800};
	text-decoration: none;
	padding: .6rem 1rem .4rem;
	margin: 0 .5rem .5rem 0;
	font-size: .875rem;
	line-height: 1rem;
	display: inline-block;
	transition: color 100ms ease-out, background 100ms ease-out;
	cursor: ${({ interactive }) => (interactive ? 'pointer' : 'default')};

	&:hover {
		${({ interactive, theme }) => (interactive ? `
		color: ${theme.primaryDark};
		background: ${theme.primaryLight};
		` : '')};
	}
`;

export const Link = styled(NavLink)`
	display: inline-block;
`;
