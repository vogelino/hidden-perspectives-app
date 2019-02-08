import styled from 'styled-components';

export const Container = styled.div`
	display: block;
	margin: 0;
	padding: 0;
	position: relative;
`;

export const Split = styled.div`
	width: 100%;
	text-align: center;
	color: ${({ theme, isEmpty }) => (isEmpty ? theme.gray400 : theme.gray600)};
	font-size: 0.875rem;
	line-height: ${({ isEmpty }) => (isEmpty ? '1.5rem' : '2.25rem')};
	height: ${({ isEmpty }) => (isEmpty ? '1.5rem' : '2.25rem')};
`;
