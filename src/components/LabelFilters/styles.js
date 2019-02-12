import styled from 'styled-components';

export const AllNoneText = styled.span`
	float: right;
	margin-bottom: 1rem;
	font-size: .875rem;
	cursor: pointer;
	transition: color 200ms ease-out;
	color: ${({ theme }) => theme.gray600};

	&:hover {
		text-decoration: underline;
		color: ${({ theme }) => theme.gray800};
	}
`;
