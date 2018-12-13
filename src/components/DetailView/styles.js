import styled from 'styled-components';
import {
	SingleDocumentPill as OriginalSingleDocumentPill,
	MultipleDocumentsPill as OriginalMultipleDocumentsPill,
	SingleEventPill as OriginalSingleEventPill,
	MultipleEventsPill as OriginalMultipleEventsPill,
} from '../MainTimeline/styles';

export const Container = styled.div`
	width: calc(100vh - 4.5rem);
	height: calc(100vh - 4.5rem);
	position: relative;
	margin: 0 auto;
	padding: 5.5rem 0 3.5rem;
	display: flex;
	flex-direction: column;
`;

export const CircleContainer = styled.div`
	flex: 1 1;
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

export const SingleDocumentPill = styled(OriginalSingleDocumentPill)`
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;

export const MultipleDocumentsPill = styled(OriginalMultipleDocumentsPill)`
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;

export const SingleEventPill = styled(OriginalSingleEventPill)`
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;

export const MultipleEventsPill = styled(OriginalMultipleEventsPill)`
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;

export const ConnectionLine = styled.line`
	stroke-width: 1px;
	stroke: ${({ theme }) => theme.commonBorderColor};
`;
