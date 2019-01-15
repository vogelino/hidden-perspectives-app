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
	width: 10rem;
	padding: .875rem 1rem .875rem 0;
	font-size: .875rem;
	line-height: 1.2rem;
	color: ${({ theme }) => theme.gray600};
	border-right: 1px solid ${({ theme }) => theme.commonBorderColor};
`;

export const Content = styled.div`
	width: calc(100% - 10rem);
`;

export const DisplayValue = styled.div`
	padding: .875rem 1rem;
	background-color: white;
	font-size: .875rem;
	line-height: 1.2rem;
	color: ${({ theme }) => theme.black};
`;

export const EditValue = styled.div`
`;
