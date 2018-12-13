import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import Button from '../_library/Button';

export const Container = styled.header`
	position: ${({ isStatic }) => (isStatic ? 'static' : 'fixed')};
	top: 4.5rem;
	left: 0;
	height: 3.5rem;
	background: ${({ theme }) => theme.gray100};
	padding: .75rem 1rem;
	display: flex;
	justify-content: space-between;
	width: 100%;
	z-index: 1;
`;

export const Tabs = styled.nav`
	list-style: none;
`;

export const Tab = styled(NavLink)`
	display: inline-block;
	font-size: .875rem;
	line-height: .875rem;
	padding: .5rem;
	text-decoration: none;
	color: ${({ theme }) => theme.gray600};
	border-radius: .125rem;

	&.active,
	&:hover,
	&:focus {
		color: ${({ theme }) => theme.black};
	}

	&.active {
		cursor: default;
		font-weight: bold;
	}

	&:not(.active):hover {
		text-decoration: underline;
	}

	&:focus {
		outline: none;
		box-shadow: inset 0 0 0 2px ${({ theme }) => theme.gray700};
	}
`;

export const BackButton = styled(Button)``;

export const EditButton = styled(Button)``;
