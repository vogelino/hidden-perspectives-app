import styled from 'styled-components';

export const Container = styled.div`
	flex: 0 0 28rem;
	height: calc(100vh - 4.5rem);
	background: white;
	position: relative;
	z-index: 1;
`;

export const LoadingContainer = styled.div`
	position: absolute;
	width: 8rem;
	height: 8rem;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	pointer-events: none;
	opacity: ${({ isLoading }) => (isLoading ? 1 : 0)};
	transition: opacity 200ms ease-out;
`;

export const Items = styled.div`
	width: 100%;
	height: calc(100vh - 4.5rem);
	position: relative;
	overflow-x: hidden;
	overflow-y: auto;
	padding: 9.8rem 2rem 2rem;
	scroll-behavior: smooth;
`;
