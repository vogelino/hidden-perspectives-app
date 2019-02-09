import styled from 'styled-components';

export const Container = styled.div`
	width: 100%;
	padding-bottom: 1rem;

	&::after {
		content: "";
		clear: both;
		display: table;
	}
`;

export const EventTitle = styled.span`
	text-decoration: none;
	color: ${({ theme }) => theme.gray900};
	transition: background 100ms ease-out, color 100ms ease-out;
	cursor: pointer;
	box-decoration-break: clone;
	padding: 0 .3rem;
	border-radius: 2px;
`;

export const Symbol = styled.span`
	position: absolute;
	top: 0;
	transition: color 200ms ease-out;
	color: ${({ theme }) => theme.gray500};
	font-family: Arial, sans-serif;
	font-size: 18px;
	line-height: 17px;
	width: 18px;
	height: 18px;
	box-sizing: border-box;
	border-radius: 50%;
	text-align: center;
`;

export const EventTitleContainer = styled.div`
	${({ right }) => (right ? 'padding-right' : 'padding-left')}: 2rem;
	margin: 1rem 0;
	position: relative;
	max-width: 20rem;
	float: ${({ right }) => (right ? 'right' : 'left')};

	&:first-child {
		margin-top: 0;
	}

	&:last-child {
		border: none;
		margin-bottom: 0;
	}

	${Symbol}  {
		${({ right }) => (right ? 'right' : 'left')}: 0;
		${({ right }) => (right && 'font-size: 14px;')}
	}

	&.pinned ${Symbol},
	&.hovered ${Symbol} {
		color: ${({ theme }) => theme.primaryDark};
		background: ${({ theme }) => theme.primaryLight};
	}

	&.hovered ${EventTitle},
	&.pinned ${EventTitle} {
		color: ${({ theme }) => theme.primaryDark};
		background: ${({ theme }) => theme.primaryLight};
	}
`;
