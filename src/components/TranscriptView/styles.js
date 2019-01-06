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
`;

export const Transcript = styled.pre`
	white-space: pre-line;
	font-family: 'Courier', monospace;
	font-size: 1rem;
	line-height: 1.5rem;
	font-weight: normal;
	padding: 3rem;
	border: 1px solid ${({ theme }) => theme.commonBorderColor};
	border-radius: 3px;
`;

export const Line = styled.div``;

export const LineContent = styled.span`
	position: relative;

	&:after {
		content: '¶';
		color: ${({ theme }) => theme.gray300};
		position: absolute;
		right: -1rem;
		bottom: 0;
	}
`;

