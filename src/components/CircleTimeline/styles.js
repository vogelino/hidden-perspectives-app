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
	transform: scale(.75);
	margin-right: .5rem;
`;

export const EventLegendContainer = styled.span`
	${legendContainerCSS}
`;

export const DocumentLegendContainer = styled.span`
	${legendContainerCSS}
`;

export const DateLabel = styled.span`
	color: black;
	display: flex;
	left: 50%;
	font-size: .6rem;
	opacity: ${({ active, current }) => (active || current ? 1 : 0)};
	pointer-events: none;
	position: absolute;
	top: 50%;
	transform: ${({ position: { x, y, translationValues } }) => `
		translate(
			calc(${translationValues.x}% + ${x}px),
			calc(${translationValues.y}% + ${y}px)
		)
	`};
	white-space: nowrap;
`;

export const Symbol = styled.span`
	font-size: ${({ children }) => (children === '▲' ? '.65rem' : '.875rem')};
	pointer-events: none;
	width: .875rem;
	height: .875rem;
	line-height: .6rem;
	text-decoration: none;
	float: left;
	padding-top: 3px;

	&::before {
		background-color: ${({ theme, current }) => (current
		? theme.primary
		: theme.commonBorderColor)};
		content: '';
		height: 1px;
		left: 50%;
		opacity: ${({ active, current }) => (active || current ? 1 : 0)};
		position: absolute;
		top: 50%;
		transform: ${({ rotation }) => `rotate(${rotation - 90}deg)`};
		transform-origin: left;
		width: ${({ labelMargin }) => `${labelMargin - 3}px`};
		z-index: -1;
	}
`;

export const ItemCountIndicator = styled.span`
	background-color: ${({ theme }) => theme.commonBorderColor};
	border-radius: 2px;
	height: 2px;
	left: 100%;
	position: absolute;
    top: 50%;
	transform: ${({ rotation }) => `
		translateY(-50%)
		rotate(${rotation + 90}deg)
	`};
	transform-origin: -7px;
	width: ${({ itemCountScale }) => `${20 * itemCountScale}px`};
	z-index: -2;
`;

export const Document = styled.foreignObject`
	position: relative;
	text-align: center;
	cursor: pointer;
	border-radius: 50%;
	background: ${({ current, theme }) => (current ? theme.primary : 'none')};
	color: ${({ current, theme }) => (current ? 'white' : theme.gray500)};
	${({ current }) => !current && 'text-shadow: -2px -2px 0 white, 2px -2px 0 white, -2px 2px 0 white, 2px 2px 0 white;'}

	&.hovered {
		color: ${({ current, theme }) => (current ? theme.primaryDark : theme.primary)};
		background: ${({ current, theme }) => (current ? theme.primaryLight : 'white')};

		${DateLabel} {
			opacity: 1;
		}
		${Symbol} {
			&::before {
				background-color: ${({ theme }) => theme.primary};
				opacity: 1;
			}
		}
		${ItemCountIndicator} {
			background-color: ${({ theme }) => theme.primary};
		}
	}
`;

export const BubbleChartContainer = styled.div`
	height: 50%;
	pointer-events: none;
	position: relative;
	width: 50%;
	max-width: 300px;
`;
