import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import Button from '../_library/Button';

export const Container = styled.header`
	position: ${({ isStatic }) => (isStatic ? 'static' : 'fixed')};
	top: 4.5rem;
	left: 0;
	height: 7rem;
	background: ${({ theme }) => theme.primaryLight};
	width: 100%;
`;

export const TabsContainer = styled.nav`
	padding: .75rem 1rem;
	display: flex;
	justify-content: space-between;
	z-index: 1;
	height: 3.5rem;
`;

export const NodeTitleContainer = styled.header`
	height: 3.5rem;
	display: flex;
`;

export const Tabs = styled.nav`
	list-style: none;
	padding-top: .25rem;
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
		background: ${({ theme }) => theme.primary};
		color: white;
		cursor: default;
		font-weight: bold;
	}

	&:not(.active):hover {
		text-decoration: underline;
	}

	&:focus {
		outline: none;
		background: ${({ theme }) => theme.primaryDark10};
	}
`;

const HeaderButton = styled(Button)`
	background: none;
`;

export const BackButton = styled(HeaderButton)``;

export const EditButton = styled(HeaderButton)``;
