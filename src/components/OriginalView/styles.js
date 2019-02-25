import styled from 'styled-components';

export const Container = styled.div`
	height: calc(100vh - 4.5rem);
	margin-top: 4.5rem;
	width: 100%;
	display: flex;
	user-select: none;
`;

export const ScrollContainer = styled.div`
	padding-top: 3.5rem;
	margin-top: 2.5rem;
	height: calc(100vh - 2.5rem);
	overflow-y: auto;
	width: calc(100vw - 25rem);
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
