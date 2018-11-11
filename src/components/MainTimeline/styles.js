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
	margin: 2rem 0;
	z-index: 2;
`;

export const Event = styled.div`
	position: absolute;
	padding-left: 1rem;
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
	top: 7px;
	left: -3px;
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
	margin-right: .5rem;
	width: 6rem;
	float: left;
`;

export const EventTitleContainer = styled.span`
	font-weight: bold;
	max-width: calc((100vw - 32rem) / 2);
	overflow: hidden;
	float: left;
	text-overflow: ellipsis;
`;

export const EventTitle = styled.span`
	white-space: nowrap;
`;

export const Document = styled(Event)`
	left: calc(12rem + ((100vw - 32rem) / 2));
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
	top: calc(.5rem - 2px);
	left: -.25rem;
	border: 1px solid ${({ theme }) => theme.gray900};
	background: ${({ theme }) => theme.usBlue};
`;
