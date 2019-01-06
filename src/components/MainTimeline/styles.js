import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
	padding: 0 18rem 0 6rem;
	width: 100vw;
	height: calc(100vh - 4.5rem);
	overflow-y: auto;
	position: relative;
`;

export const MinimapContainer = styled.div`
	width: 6rem;
	height: 100%;
	position: fixed;
	top: 4.5rem;
	left: 0;
	border-right: 1px solid ${({ theme }) => theme.commonBorderColor};
	z-index: 1;
`;

export const BubbleChartContainer = styled.div`
	align-items: center;
	border-left: 1px solid ${({ theme }) => theme.commonBorderColor};
	display: flex;
	height: 100%;
	justify-content: center;
	position: fixed;
	right: 0;
	top: 0;
	width: 18rem;
	z-index: 1;
`;

export const Event = styled.div`
	padding: 0;
	font-size: .875rem;
	line-height: 1.25rem;
	font-weight: bold;
	display: flex;
	position: relative;
`;

export const EventContainer = styled.div`
`;

export const EventPill = styled.div`
	position: absolute;
	border-radius: 50%;
	background: ${({ theme }) => theme.gray900};
	box-shadow: 0 0 0 2px white;
`;

export const SingleEventPill = styled(EventPill)`
	width: 5px;
	height: 5px;
	top: calc(2rem + 1px);
	left: 50%;
	transform: translateX(-50%);
	z-index: 2;
`;

export const MultipleEventsPill = styled(EventPill)`width: 17px;
	height: 11px;
	width: 11px;
	top: 0;
	left: -9px;
	box-shadow: 0 0 0 1px white;
	font-size: 8px;
	font-weight: bold;
	box-sizing: border-box;
	text-align: center;
	line-height: 11px;
	color: white;
`;

export const EventDate = styled.span`
	color: ${({ theme }) => theme.gray600};
	position: absolute;
	left: 50%;
	top: 1.4rem;
	transform: translateX(-50%);
	background: white;
	z-index: 1;
	width: 1.5rem;
	height: 1.5rem;
	border-radius: 50%;
	border: 1px solid ${({ theme }) => theme.commonBorderColor};
	text-align: center;
	padding: 1px 0;
	font-size: 0.75rem;
`;

export const EventTitle = styled(Link)`
	display: inline-block;
	text-decoration: none;
	color: ${({ theme }) => theme.gray900};
	max-width: 20rem;

	&:hover {
		text-decoration: underline;
	}
`;

export const EventTitleContainer = styled.div`
	padding: 0 1.5rem;
	margin: 1rem 0;
	position: relative;

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

export const MultipleDocumentsPill = styled(MultipleEventsPill)`
	border-radius: 0;
	height: .5rem;
	width: .5rem;
	top: calc(.5rem - 3px);
	left: -.25rem;
	border: 1px solid ${({ theme }) => theme.gray900};
	background: ${({ theme }) => theme.usBlue};
	box-shadow: -1px -1px 0 0 white, -2px -2px 0 0 ${({ theme }) => theme.gray900};
`;

export const SingleDocumentPill = styled(SingleEventPill)`
	border-radius: 0;
	height: .5rem;
	width: .5rem;
	top: 10px;
	left: -1.25rem;
	border: 1px solid ${({ theme }) => theme.gray900};
	background: ${({ theme }) => theme.usBlue};
`;

const Column = styled.div`
	flex: 0 0 50%;
	padding: 1.5rem;
	position: relative;
`;

export const Events = styled(Column)`
	position: static;

	${EventTitleContainer}:after {
		content: '●';
		right: auto;
		left: 0;
	}
`;

export const Documents = styled(Column)`
	border-right: 1px solid ${({ theme }) => theme.commonBorderColor};
	text-align: right;
`;
