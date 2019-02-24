import styled, { css } from 'styled-components';

export const CircleContainer = styled.div`
	align-items: center;
	display: flex;
    justify-content: center;
	flex: 1 1;
	position: relative;
	min-height: calc(100vh - 8rem);
	max-height: calc(100vh - 8rem);
	margin-top: 3.5rem;
`;

export const CircleContent = styled.div`
	height: calc(100vw - 50rem);
	width: calc(100vw - 50rem);
	max-width: 40rem;
	max-height: 70vh;
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
	padding: 4px 5px 2px;
	border-radius: 8px;
	background: white;
`;

export const Symbol = styled.span`
	pointer-events: none;
	width: 1rem;
	height: 1rem;
	text-decoration: none;
	float: left;
	user-select: none;
	border-radius: 50%;
	background: ${({ current, theme }) => (current ? theme.primary : 'white')};

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
		box-shadow: 0 0 0 3px white;
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
	box-shadow: 0 0 0 2px white;
`;

export const Document = styled.foreignObject`
	position: relative;
	text-align: center;
	cursor: pointer;
	color: ${({ current, theme }) => (current ? 'white' : theme.gray500)};
	${({ current }) => !current && 'text-shadow: -2px -2px 0 white, 2px -2px 0 white, -2px 2px 0 white, 2px 2px 0 white;'}
	overflow: visible;

	&:hover {
		${DateLabel} {
			opacity: 1;
		}

		${Symbol}::before {
			opacity: 1;
		}
	}
	
	&.hovered {
		color: ${({ theme }) => theme.primaryDark};
		text-shadow: none;

		${Symbol} {
			background-color: ${({ theme }) => theme.primaryLight};
		}

		${ItemCountIndicator} {
			background-color: ${({ theme }) => theme.primaryLight};
		}
	}

	&:focus {
		outline: none;
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
