import styled from 'styled-components';

export const BubbleChartContainer = styled.div`
    border-radius: 50%;
    position: absolute;
`;

export const BubbleLink = styled.a``;

export const BubblesWrapper = styled.svg`
    display: block;
    height: ${({ diameter }) => diameter}px;
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

export const Bubble = styled.circle`
    align-items: center;
    height: ${({ r }) => r * 2}px;
    fill: ${({ isHovered, theme }) => (isHovered ? theme.primaryLight : theme.gray200)};
    left: ${({ x }) => x}px;
    opacity: ${({ isLoading }) => (isLoading ? 0 : 1)};
    top: ${({ y }) => y}px;
    transition: fill 150ms;
    width: ${({ r }) => r * 2}px;
    cursor: pointer;
    transition: fill 400ms ease-out;

    &:hover {
        fill: ${({ theme }) => theme.primary};
    }
`;

export const Text = styled.text`
    alignment-baseline: central;
    font-size: ${({ fontSize }) => fontSize}px;
    line-height: ${({ fontSize }) => fontSize}px;
    opacity: ${({ isLoading }) => (isLoading ? 0 : 1)};
    pointer-events: none;
    text-anchor: middle;
    transition: fill 400ms ease-out;
    fill: ${({ isHovered, theme }) => (isHovered ? theme.primaryDark : theme.gray900)};
`;
