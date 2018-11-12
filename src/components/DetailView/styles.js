import styled from 'styled-components';
import { Button } from '@smooth-ui/core-sc';
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
	padding: 2rem 0;
	display: flex;
	flex-direction: column;
`;

export const Title = styled.h1`
	width: 25vw;
	min-width: 17rem;
	font-size: 1rem;
	line-height: 1.5rem;
	text-align: center;
	margin: 0 auto;
	flex: 0 0 auto;
	padding-bottom: 3rem;
`;

export const Subtitle = styled(Title)`
	font-size: .75rem;
	line-height: 1rem;
	padding-bottom: 0.5rem;
	color: ${({ theme }) => theme.gray600};
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

export const ShowMoreButtonContainer = styled.div`
	flex: 0 0;
	padding-top: 4rem;
	text-align: center;
`;

export const ShowMoreButton = styled(Button)`
	border: 1px solid ${({ theme }) => theme.commonBorderColor};
	background: white;
	font-weight: bold;
	font-size: .875rem;
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
