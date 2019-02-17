import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Container = styled.span`
	background-image: url("${({ itemType }) => `/icons/${itemType}.svg`}");
	background-size: 18px;
	background-position: -0.2rem 0.3rem;
	background-repeat: no-repeat;
	margin: 0 1rem .2rem 0;
	display: block;
	color: ${({ theme }) => theme.gray600};
	position: relative;
	padding-left: 1.2rem;
	min-height: 2rem;
`;

export const Text = styled.span`
	font-size: .875rem;
	line-height: 1.2rem;
	padding: .4rem 0 0;
	display: inline-block;
	transition: color 200ms ease-out;
`;

export const Link = styled(NavLink)`
	display: block;

	&:hover ${Text} {
		color: ${({ theme }) => theme.gray900};
		text-decoration: underline;
	}
`;
