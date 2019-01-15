import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
	width: 100%;
	margin-bottom: 1rem;

	&::after {
		content: "";
		clear: both;
		display: table;
	}
`;

export const EventTitle = styled(Link)`
	text-decoration: none;
	color: ${({ theme }) => theme.gray900};
	transition: background 100ms ease-out, color 100ms ease-out;
`;

export const EventTitleContainer = styled.div`
	padding: 0 1.5rem;
	margin: 1rem 0;
	position: relative;
	max-width: 20rem;
	float: ${({ right }) => (right ? 'right' : 'left')};

	&:after {
		content: '▲';
		position: absolute;
		top: 0.55rem;
		right: .5rem;
		transition: color 200ms ease-out;
		transform: translate(50%, -50%) scale(.7);
		color: ${({ theme }) => theme.gray500};
	}

	&:first-child {
		margin-top: 0;
	}

	&:last-child {
		border: none;
		margin-bottom: 0;
	}

	&.hovered::after {
		color: ${({ theme }) => theme.primary};
	}

	&.hovered ${EventTitle} {
		color: ${({ theme }) => theme.primaryDark};
		background: ${({ theme }) => theme.primaryLight};
	}
`;
