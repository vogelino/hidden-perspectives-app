import styled, { css } from 'styled-components';

export const CircleContainer = styled.div`
	align-items: center;
	display: flex;
    justify-content: center;
	flex: 1 1;
	position: relative;
	height: calc(100vh - 12rem);
	margin: 2rem 0;
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
	padding-top: 2px;
`;

export const Document = styled.foreignObject`
	position: relative;
	text-align: center;
	cursor: pointer;
	border-radius: 50%;
	background: ${({ current, theme }) => (current ? theme.primary : 'white')};
	color: ${({ current, theme }) => (current ? 'white' : theme.gray500)};

	&.hovered {
		color: ${({ current, theme }) => (current ? theme.primaryDark : theme.primary)};
		background: ${({ current, theme }) => (current ? theme.primaryLight : 'white')};
	}
`;

export const BubbleChartContainer = styled.div`
	height: 50%;
	pointer-events: none;
	position: relative;
	width: 50%;
	max-width: 300px;
`;

