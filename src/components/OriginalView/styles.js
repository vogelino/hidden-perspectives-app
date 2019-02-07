import styled from 'styled-components';

export const Container = styled.div`
	overflow-y: auto;
	height: calc(100vh - 4.5rem);
	margin-top: 4.5rem;
	padding-top: 7.8rem;
	width: 100%;
	user-select: none;
`;

export const Content = styled.div`
	max-width: 50rem;
	margin: 0 auto;
	padding: 3rem 0;
	position: relative;

	.react-pdf__Page__canvas {
		border-radius: 3px;
		border: 1px solid ${({ theme }) => theme.commonBorderColor};
		height: calc(100vh - 13rem) !important;
		width: auto !important;
		margin: 0 auto 2rem;
		display: block;
	}
`;
