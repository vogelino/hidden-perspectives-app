import styled from 'styled-components';

export const LegendLabel = styled.span`
	padding-left: 1.25rem;
	position: relative;
	font-size: .875rem;
	display: inline-block;
	color: ${({ theme }) => theme.colors.gray600};
	${({ position }) => (position !== 'center' && `float: ${position};`)}
	${({ position }) => (position === 'center' && 'margin: 0 auto;')}

	&:before {
		content: '${({ symbol }) => (symbol || '▲')}';
		transform: scale(${({ symbol }) => (symbol ? 1 : 0.8)});
		position: absolute;
		top: 0;
		left: 0;
	}
`;

export const MainTimelineContainer = styled.div`
	position: fixed;
	top: 4.5rem;
	left: 0;
	width: 100%;
	height: 2.25rem;
	padding: 0 0 0 6rem;
	z-index: 10;
`;

export const LegendContainer = styled.span`
	margin: .5rem 0;
	display: inline-block;
	${({ position }) => (position !== 'center' && `float: ${position};`)}
	${({ position }) => (position === 'center' && 'margin: .5rem auto;')}
`;

export const TimelineLegends = styled.div`
	width: calc(100vw - 24rem);
	padding: 0 .5rem;
	display: inline-block;
`;

export const ProtagonistLegendContainer = styled.div`
	width: 18rem;
	padding: 0 .5rem;
	float: right;
	text-align: center;
`;
