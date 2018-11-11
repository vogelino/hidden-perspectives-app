import styled from 'styled-components';

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

export const EventsContainer = styled.div`
	height: ${({ height }) => height}px;
	position: relative;
	margin-top: 1rem;
	z-index: 2;
`;

export const Event = styled.div`
	position: absolute;
	padding-left: 16px;
`;

export const EventPill = styled.div`
	position: absolute;
	border-radius: 50%;
	background: ${({ theme }) => theme.gray900};
	box-shadow: 0 0 0 2px white;
`;

export const SingleEventPill = styled(EventPill)`
	width: 7px;
	height: 7px;
	top: 8px;
	left: -4px;
`;

export const MultipleEventsPill = styled(EventPill)`width: 17px;
	height: 17px;
	top: 3px;
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
	margin-right: .5rem;
	width: 6rem;
	display: inline-block;
	text-align: right;
`;

export const EventTitle = styled.span`
	font-weight: bold;
`;
