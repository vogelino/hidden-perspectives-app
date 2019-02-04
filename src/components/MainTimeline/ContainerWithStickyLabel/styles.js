import styled, { css } from 'styled-components';

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
	z-index: ${({ isYear }) => (isYear ? 4 : 3)};
	/* border-bottom: 1px solid ${({ theme }) => theme.commonBorderColor}; */
	/* box-shadow: 0 -1px 0 0 ${({ theme }) => theme.commonBorderColor}; */
	display: flex;
`;

export const Split = styled.div`
	width: 100%;
	text-align: center;
	color: ${({ theme }) => theme.gray600};
	font-size: 0.875rem;
	line-height: ${({ isEmpty }) => (isEmpty ? '24px' : '36px')};
	height: ${({ isEmpty }) => (isEmpty ? '24px' : '36px')};
`;
