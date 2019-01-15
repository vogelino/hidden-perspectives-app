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

	&.hovered {
		color: ${({ theme }) => theme.primaryDark};
		background: ${({ theme }) => theme.primaryLight};
	}
`;

export const EventTitleContainer = styled.div`
	padding: 0 1.5rem;
	margin: 1rem 0;
	position: relative;
	max-width: 20rem;
	float: ${({ right }) => (right ? 'right' : 'left')};

	&:after {
		content: '■';
		position: absolute;
		top: 0.55rem;
		right: .5rem;
		transform: translate(50%, -50%);
		color: ${({ theme }) => theme.gray800};
	}

	&:first-child {
		margin-top: 0;
	}

	&:last-child {
		border: none;
		margin-bottom: 0;
	}
`;
