import styled, { css } from 'styled-components';

export const CircleContainer = styled.div`
	align-items: center;
	display: flex;
    justify-content: center;
	flex: 1 1;
	position: relative;
	min-height: calc(100vh - 15.3rem);
	max-height: calc(100vh - 15.3rem);
	margin-top: 10.8rem;
`;

export const CircleContent = styled.div`
	height: 40rem;
	width: 40rem;
	max-width: 100%;
	max-height: calc(100% - 4rem);
	flex-grow: 0;
	position: relative;
`;

export const CircleSvg = styled.svg`
	position: absolute;
	height: 100%;
	width: auto;
	max-width: 100%;
	max-height: 100%;
	top: 0;
	left: 50%;
	transform: translateX(-50%);
	overflow: visible;
`;

export const Circle = styled.circle`
	stroke: ${({ theme }) => theme.commonBorderColor};
	fill: none;
	stroke-dashoffset: ${({ missingAngle, r }) => ((r * 2) * missingAngle)};
	transform-origin: ${({ cx, cy }) => `${cx}px ${cy}px`};
	transform: rotate(-90deg);
`;

export const LegendObject = styled.foreignObject`
	text-align: right;
`;

const legendContainerCSS = css`
	display: inline-block;
	transform-origin: 100% 50%;
	transform: scale(.8);
	margin-right: .5rem;
`;

export const EventLegendContainer = styled.span`
	${legendContainerCSS}
`;

export const DocumentLegendContainer = styled.span`
	${legendContainerCSS}
`;

export const Symbol = styled.span`
	font-size: .875rem;
	transform: scale(${({ children }) => (children === '▲' ? 0.7 : 1)});
	pointer-events: none;
	width: .875rem;
	height: .875rem;
	line-height: ${({ children }) => (children === '▲' ? '.625rem' : '.75rem')};
	text-decoration: none;
	float: left;
	user-select: none;
	font-family: Arial, sans-serif;
`;

export const Document = styled.foreignObject`
	position: relative;
	text-align: center;
	cursor: pointer;
	border-radius: 50%;
	background: ${({ current, theme }) => (current ? theme.primary : 'none')};
	color: ${({ current, theme }) => (current ? 'white' : theme.gray500)};
	${({ current }) => !current && 'text-shadow: -2px -2px 0 white, 2px -2px 0 white, -2px 2px 0 white, 2px 2px 0 white;'}

	&.pinned,
	&.hovered {
		color: ${({ theme }) => theme.primaryDark};
		background: ${({ theme }) => theme.primaryLight};
		text-shadow: none;
	}
`;

export const BubbleChartContainer = styled.div`
	height: 100%;
	pointer-events: none;
	position: relative;
	width: 50%;
	max-width: 30rem;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;

