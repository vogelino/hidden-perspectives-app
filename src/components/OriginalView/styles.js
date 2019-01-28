import styled from 'styled-components';

export const Container = styled.div`
	overflow-y: auto;
	height: calc(100vh - 11.5rem);
	margin-top: 11.5rem;
	width: 100%;
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
