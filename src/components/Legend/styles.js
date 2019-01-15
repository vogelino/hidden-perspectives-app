import styled from 'styled-components';

export const Right = styled.span`
	float: right;
`;

export const LegendLabel = styled.span`
	padding-left: 1.25rem;
	position: relative;
	font-size: .875rem;
	color: ${({ theme }) => theme.colors.gray600};

	&:before {
		content: '${({ symbol }) => (symbol || '▲')}';
		transform: scale(${({ symbol }) => (symbol ? 1 : 0.8)});
		position: absolute;
		top: 4px;
		left: 0;
	}
`;

export const MainTimelineContainer = styled.div`
	position: fixed;
	top: 4.5rem;
	left: 0;
	width: 100%;
	height: 2.25rem;
	padding: .5rem 19rem .5rem 7rem;
	z-index: 10;
`;
