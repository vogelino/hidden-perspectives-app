import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
	width: 8rem;
	height: 8rem;
	display: inline-block;
	position: relative;
`;

export const Circle = styled.div`
	width: 8rem;
	height: 8rem;
	display: inline-block;
	border: 1px solid ${({ theme }) => theme.commonBorderColor};
	border-radius: 50%;
`;

const spin = keyframes`
	from { transform: rotate(0deg); }
	to { transform: rotate(360deg); }
`;

export const Document = styled.div`
	width: 4rem;
	height: 2px;
	position: absolute;
	top: 4rem;
	left: 4rem;
	transform-origin: 0 1px;
	display: inline-block;
	animation-name: ${spin};
	animation-iteration-count: infinite;
	animation-duration: 1s;
	animation-timing-function: linear;

	&:before {
		content: '';
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: ${({ theme }) => theme.gray900};
		display: inline-block;
		position: absolute;
		right: -3px;
		top: -3px;
	}
`;

export const Event = styled(Document)`
	animation-duration: 2s;
	animation-delay: 333ms;

	&:before {
		border-radius: 0;
	}
`;

export const Text = styled.div`
	text-align: center;
	margin-top: 1rem;
`;

export const LoadingContainer = styled.div`
	position: fixed;
	width: 8rem;
	height: 8rem;
	top: 50vh;
	left: 50vw;
	transform: translate(-50%, -50%);
	pointer-events: none;
	opacity: ${({ isLoading }) => (isLoading ? 1 : 0)};
	transition: opacity 200ms ease-out;
`;
