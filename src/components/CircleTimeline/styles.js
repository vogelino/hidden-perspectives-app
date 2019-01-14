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

export const ItemCircle = styled.circle`
	fill: ${({ theme }) => theme.gray900};
`;

export const Document = styled.foreignObject`
	position: relative;
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


export const EventPill = styled.div`
	position: absolute;
	border-radius: 50%;
	background: ${({ theme }) => theme.gray900};
	box-shadow: 0 0 0 2px white;
`;

export const SingleEventPill = styled(EventPill)`
	width: 5px;
	height: 5px;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 2;
`;

export const MultipleEventsPill = styled(EventPill)`width: 17px;
	height: 11px;
	width: 11px;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	box-shadow: 0 0 0 1px white;
	font-size: 8px;
	font-weight: bold;
	box-sizing: border-box;
	text-align: center;
	line-height: 11px;
	color: white;
`;

export const MultipleDocumentsPill = styled(MultipleEventsPill)`
	border-radius: 0;
	height: .5rem;
	width: .5rem;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	border: 1px solid ${({ theme }) => theme.gray900};
	background: ${({ theme }) => theme.usBlue};
	box-shadow: -1px -1px 0 0 white, -2px -2px 0 0 ${({ theme }) => theme.gray900};
`;

export const SingleDocumentPill = styled(SingleEventPill)`
	border-radius: 0;
	height: .5rem;
	width: .5rem;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	border: 1px solid ${({ theme }) => theme.gray900};
	background: ${({ theme }) => theme.usBlue};
`;

export const ConnectionLine = styled.line`
	stroke-width: 1px;
	stroke: ${({ theme }) => theme.commonBorderColor};
`;
