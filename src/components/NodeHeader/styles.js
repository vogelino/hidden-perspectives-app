import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import Button from '../_library/Button';

export const Container = styled.header`
	position: ${({ isStatic }) => (isStatic ? 'static' : 'fixed')};
	top: 4.5rem;
	left: 0;
	width: 100%;
	z-index: 2;
	background: rgba(255,255,255,.95);
	box-shadow: 0 .5rem 2rem .5rem rgba(255,255,255,.6);
	border-bottom: 1px solid ${({ theme }) => theme.gray100};
`;

export const TabsContainer = styled.nav`
	padding: .75rem 1rem;
	display: flex;
	justify-content: space-around;
	z-index: 1;
	height: 3.5rem;
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
	margin-right: 0.5rem;

	&:last-child {
		margin-right: 0;
	}

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

const StyledButton = styled(Button)`
	position: absolute;
	top: .25rem;

	& > button {
		font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
		border: none;
		background: none;
		font-size: 1.5rem;
		line-height: 1.5rem;
		color: ${({ theme }) => theme.gray500};
		cursor: pointer;
		padding: .5rem 0;
		text-align: center;
		width: 2.5rem;
		height: 2.5rem;
		border-radius: 50%;

		&:hover:not(.disabled) {
			color: ${({ theme }) => theme.primaryDark};
			background: ${({ theme }) => theme.primaryLight};
		}
	}
`;

export const BackButton = styled(StyledButton)`
	left: .5rem;
`;

export const EditButton = styled(StyledButton)`
	right: .5rem;
`;
