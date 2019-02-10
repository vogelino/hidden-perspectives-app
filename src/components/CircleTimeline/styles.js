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
	line-height: ${({ children }) => (children === '▲' ? '.5rem' : '.4rem')};
	text-decoration: none;
	float: left;
	padding-top: 3px;
	font-family: Arial, sans-serif;
	user-select: none;

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
	overflow: visible;

	&:hover {
		${DateLabel} {
			opacity: 1;
		}
		${Symbol} {
			&::before {
				background-color: ${({ theme }) => theme.primaryLight};
				opacity: 1;
			}
		}
	}
	
	&.pinned,
	&.hovered {
		color: ${({ theme }) => theme.primaryDark};
		background: ${({ theme }) => theme.primaryLight};
		text-shadow: none;

		${ItemCountIndicator} {
			background-color: ${({ theme }) => theme.primaryLight};
		}
	}
`;

export const BubbleChartContainer = styled.div`
	height: 50%;
	pointer-events: none;
	position: relative;
	width: 50%;
	max-width: 30rem;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;
