import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import Button from '../_library/Button';

export const Container = styled.header`
	position: ${({ isStatic }) => (isStatic ? 'static' : 'fixed')};
	top: 4.5rem;
	left: 0;
	height: 7.8rem;
	width: 100%;
	z-index: 1;
	background: rgba(255,255,255,.95);
	box-shadow: 0 .5rem 2rem .5rem rgba(255,255,255,.6);
`;

export const TabsContainer = styled.nav`
	padding: .75rem 1rem;
	display: flex;
	justify-content: space-between;
	z-index: 1;
	height: 3.5rem;
`;

export const NodeTitleContainer = styled.header`
	height: 4.3rem;
	display: flex;
	position: relative;
	z-index: 2;
`;

export const Tabs = styled.nav`
	list-style: none;
	padding-top: .125rem;
`;

export const Tab = styled(NavLink)`
	display: inline-block;
	font-size: .875rem;
	line-height: .875rem;
	padding: .5rem 1rem .4rem;
	text-decoration: none;
	color: ${({ theme }) => theme.gray900};
	border-radius: 2rem;

	&.active {
		background: ${({ theme }) => theme.primaryLight};
		color: ${({ theme }) => theme.primaryDark};
		cursor: default;
	}

	&:not(.active):hover {
		text-decoration: underline;
	}

	&:focus {
		outline: none;
		background: ${({ theme }) => theme.primaryDark10};
	}
`;

export const BackButton = styled(Button)``;

export const EditButton = styled(Button)``;
