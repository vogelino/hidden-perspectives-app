import styled from 'styled-components';

export const LegendLabel = styled.span`
	padding-left: 1.25rem;
	position: relative;
	font-size: .875rem;
	color: ${({ theme }) => theme.colors.gray600};
	${({ right }) => (right ? 'float: right;' : '')}

	&:before {
		content: '${({ symbol }) => (symbol || '●')}';
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
	padding: .5rem 19rem .5rem 7rem;
	z-index: 10;
`;
