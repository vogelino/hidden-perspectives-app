import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Container = styled.span`
	margin: 0 1rem .5rem 0;
	display: inline-block;
	color: ${({ theme }) => theme.gray600};
	position: relative;
	padding-left: 2.5rem;
	min-height: 2rem;
`;

export const Text = styled.span`
	font-size: .875rem;
	line-height: .875rem;
	padding: .6rem 0 0;
	display: inline-block;
	transition: color 200ms ease-out;
`;

export const Link = styled(NavLink)`
	display: inline-block;

	&:hover ${Text} {
		color: ${({ theme }) => theme.gray900};
		text-decoration: underline;
	}
`;

export const Circle = styled.span`
	width: 2rem;
	height: 2rem;
	position: absolute;
	left: 0;
	border-radius: 50%;
	border: 1px solid ${({ theme }) => theme.commonBorderColor};
	background-image: url('${({ image }) => image}');
	background-size: cover;
	background-repeat: no-repeat;
	margin-right: 0.5rem;
	display: inline-block;
	vertical-align: middle;
	text-align: center;
	font-size: .75rem;
	line-height: .75rem;
	padding: .7rem 0;

	&:before {
		content: '';
	}
`;
