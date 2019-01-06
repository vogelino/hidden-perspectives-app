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
