import styled from 'styled-components';

export const Container = styled.div`
	display: block;
	margin: 0;
	padding: 0;
	position: relative;
`;

export const Label = styled.header`
	position: sticky;
	top: 0;
	left: 0;
	width: 100%;
	font-size: .875rem;
	line-height: 1rem;
	color: ${({ theme }) => theme.gray600};
	z-index: ${({ isYear }) => (isYear ? 4 : 3)};
	display: flex;
`;

export const Split = styled.div`
	flex: 0 0 50%;
	padding: 1rem 1.5rem;
	display: inline-block;
	background: ${({ hasContent }) => (hasContent ? 'rgba(255,255,255,.9)' : 'none')};

	&:first-child {
		border-right: 1px solid ${({ theme }) => theme.commonBorderColor};
		text-align: right;
	}
`;
