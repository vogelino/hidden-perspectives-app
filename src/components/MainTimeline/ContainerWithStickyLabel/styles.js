import styled from 'styled-components';

export const Container = styled.div`
	display: block;
	margin: 0;
	padding: 0;
	position: relative;
`;

export const Label = styled.header`
	position: sticky;
	top: ${({ isYear }) => (isYear ? 0 : '2.25rem')};
	left: 0;
	width: 100%;
	font-size: .875rem;
	line-height: 1rem;
	color: ${({ theme }) => theme.gray600};
	font-weight: bold;
	padding: .625rem .875rem;
	background: white;
	z-index: ${({ isYear }) => (isYear ? 4 : 3)};
	border-bottom: 1px solid ${({ theme }) => theme.commonBorderColor};
	box-shadow: 0 -1px 0 0 ${({ theme }) => theme.commonBorderColor};
`;
