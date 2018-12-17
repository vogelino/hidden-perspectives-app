import styled from 'styled-components';

export const LegendContainer = styled.ul`
	position: fixed;
	bottom: 1rem;
	left: ${({ nomargin }) => (nomargin ? '2rem' : '8rem')};
	padding: 1.25rem 1.5rem;
	border-radius: 0.25rem;
	z-index: 4;
	background: rgba(255,255,255,.95);
`;

export const LegendLine = styled.li`
	padding: 0;
	margin: 0 0 .75rem 0;
	list-style: none;

	&:last-child {
		margin: 0;
	}
`;

export const LegendLabel = styled.span`
	padding-left: 1.25rem;
	position: relative;
	font-size: .875rem;

	&:before {
		content: '${({ symbol }) => (symbol || '●')}';
		position: absolute;
		top: 0;
		left: 0;
	}
`;
