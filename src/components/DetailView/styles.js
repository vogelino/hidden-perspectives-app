import styled from 'styled-components';
import { Button } from '@smooth-ui/core-sc';

export const Container = styled.div`
	width: calc(100vh - 4.5rem);
	max-width: 100%;
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
	flex: 1 0 auto;
	padding-bottom: 3rem;
`;

export const Subtitle = styled(Title)`
	font-size: .75rem;
	line-height: 1rem;
	padding-bottom: 0.5rem;
	color: ${({ theme }) => theme.gray600};
`;

export const CircleContainer = styled.svg`
	flex: 1 1 100vh;
`;

export const Circle = styled.circle`
	stroke: ${({ theme }) => theme.commonBorderColor};
	fill: none;
	stroke-dashoffset: ${({ missingAngle }) => (1000 * missingAngle)};
	transform-origin: 500px 500px;
	transform: rotate(-90deg);
`;

export const ItemCircle = styled.circle`
	fill: ${({ theme }) => theme.gray900};
`;

export const ShowMoreButtonContainer = styled.div`
	padding-top: 4rem;
	text-align: center;
`;

export const ShowMoreButton = styled(Button)`
	border: 1px solid ${({ theme }) => theme.commonBorderColor};
	background: white;
	font-weight: bold;
	font-size: .875rem;
`;
