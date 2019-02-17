import styled from 'styled-components';

export const BubbleChartContainer = styled.div`
    border-radius: 50%;
    height: auto;
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 100%;

    &:before{
        content: '';
        display: block;
        margin-top: 100%;
    }
`;

export const BubblesSvg = styled.svg`
    display: block;
    height: 100%;
    left: 50%;
    max-height: 100%;
    max-width: 100%;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    width: auto;
    overflow: visible;
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

export const Text = styled.text`
    alignment-baseline: central;
    fill: ${({ isHovered, theme }) => (isHovered ? theme.primaryDark : theme.gray900)};
    font-size: ${({ fontSize }) => fontSize}px;
    line-height: ${({ fontSize }) => fontSize}px;
    opacity: ${({ isLoading }) => (isLoading ? 0 : 1)};
    pointer-events: none;
    text-anchor: middle;
    transition: fill 100ms ease-out, opacity 100ms ease-out;
    transform-origin: 50% 50%;
`;
