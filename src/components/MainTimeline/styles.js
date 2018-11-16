import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
	padding: 0 0 0 6rem;
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

export const Event = styled.div`
	padding: .5rem 1rem .5rem 3rem;
	font-size: .875rem;
	line-height: 1.25rem;
	font-weight: bold;
	display: flex;
	position: relative;
`;

export const EventContainer = styled.div`
	&:first-of-type {
		padding-top: .5rem;
	}

	&:last-of-type {
		padding-bottom: .5rem;
	}
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
	top: 1.125rem;
	left: -3px;
	transform: translateY(-50%);
	z-index: 2;
`;

export const MultipleEventsPill = styled(EventPill)`width: 17px;
	height: 17px;
	top: 0;
	left: -9px;
	box-shadow: 0 0 0 1px white;
	font-size: 11px;
	font-weight: bold;
	box-sizing: border-box;
	text-align: center;
	line-height: 17px;
	color: white;
`;

export const EventDate = styled.span`
	color: ${({ theme }) => theme.gray600};
	position: absolute;
	left: .875rem;
	top: .5rem;

	&:after {
		content: '.';
	}
`;

export const EventTitle = styled(Link)`
	display: block;
	text-decoration: none;
	color: ${({ theme }) => theme.gray900};
	margin-bottom: 0.5rem;
	position: relative;

	&:hover {
		text-decoration: underline;
	}

	&:last-child {
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
	flex: 1 1 50%;
	padding: 0 1rem 0 2rem;
	position: relative;
`;

export const Events = styled(Column)`
	padding-left: 0;
	position: static;
`;

export const Documents = styled(Column)`
	padding-left: 1.25rem;
`;

export const ScrollMask = styled.div`
	position: fixed;
	top: 4.5rem;
	left: 0;
	background: white;
	width: 6rem;
	height: calc(2.375rem - 1px);
	box-shadow: inset -1px 0 0 0 ${({ theme }) => theme.commonBorderColor};
	z-index: 3;
`;
