import styled from 'styled-components';

export const Container = styled.span`
	border-radius: 0.125rem;
	background: ${({ theme }) => theme.gray200};
	padding: .5rem .625rem;
	margin: 0 .5rem .5rem 0;
	font-size: .875rem;
	line-height: 1rem;
	display: inline-block;
`;
