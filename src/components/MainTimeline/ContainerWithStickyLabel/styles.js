import styled from 'styled-components';

export const Container = styled.div`
	display: block;
	margin: 0;
	padding: 0;
	position: relative;
`;

export const Label = styled.header`
	position: sticky;
	top: 0;
	left: 0;
	width: 100%;
	font-size: .875rem;
	line-height: 1rem;
	color: ${({ theme }) => theme.gray600};
	font-weight: bold;
	padding: .625rem .875rem;
	background: white;
	z-index: 3;
	border-bottom: 1px solid ${({ theme }) => theme.commonBorderColor};
	box-shadow: 0 -1px 0 0 ${({ theme }) => theme.commonBorderColor};
`;
