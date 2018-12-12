import styled from 'styled-components';

export const Row = styled.div`
	display: flex;
	flex-wrap: nowrap;
	border-bottom: 1px solid ${({ theme }) => theme.commonBorderColor};

	&:last-of-type {
		border-bottom: 0;
	}
`;

export const Label = styled.span`
	flex: 0 0 10rem;
	padding: .875rem 1rem .875rem 0;
	font-size: 1rem;
	line-height: 1.2rem;
	color: ${({ theme }) => theme.gray600}
	border-right: 1px solid ${({ theme }) => theme.commonBorderColor};
`;

export const Content = styled.div`
	flex: 1 1 100%;
`;
