import styled from 'styled-components';

export const BubblesWrapper = styled.div`
    border-radius: 50%;
    height: ${({ diameter }) => diameter}px;
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    width: ${({ diameter }) => diameter}px;
`;

export const BubblesLoadingContainer = styled.div`
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

export const Bubble = styled.div`
    align-items: center;
    background-color: ${({ theme }) => theme.gray200};
    border-radius: 50%;
    display: flex;
    height: ${({ r }) => r * 2}px;
    font-size: 0.5rem;
    justify-content: center;
    left: ${({ x }) => x}px;
    opacity: ${({ isLoading }) => (isLoading ? 0 : 1)};
    position: absolute;
    text-align: center;
    top: ${({ y }) => y}px;
    transform: translate(-50%, -50%);
    transition: opacity 200ms ease-out;
    width: ${({ r }) => r * 2}px;
`;
