import styled from 'styled-components';

export const Container = styled.div`
	overflow-y: auto;
	height: calc(100vh - 4.5rem);
	margin-top: 4.5rem;
	padding-top: 7.8rem;
	width: 100%;
`;

export const Content = styled.div`
	max-width: 50rem;
	margin: 0 auto;
	padding: 3rem 0;
`;

export const Transcript = styled.pre`
	white-space: pre-line;
	padding: 3rem;
	border: 1px solid ${({ theme }) => theme.commonBorderColor};
	border-radius: 3px;

	* {
		font-family: 'Suisse Intl Mono', 'Courier', monospace;
		font-size: .875rem;
		line-height: 1.2rem;
		font-weight: normal;
		letter-spacing: -.04em;
	}
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

