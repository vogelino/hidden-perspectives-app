import styled from 'styled-components';

export const Container = styled.div`
	overflow-y: auto;
	height: calc(100vh - 8rem);
	margin-top: 3.5rem;
	float: left;
	width: 100%;
`;

export const Content = styled.div`
	max-width: 50rem;
	margin: 0 auto;
	padding: 3rem 0;
	position: relative;

	.react-pdf__Page__svg {
		width: 100% !important;
		height: auto !important;
	}

	svg {
		border-radius: 3px;
		border: 1px solid ${({ theme }) => theme.commonBorderColor};
		height: calc(100vh - 13rem);
		width: auto;
		margin: 0 auto 2rem;
		display: block;
	}
`;
