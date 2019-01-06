import styled from 'styled-components';

export const Container = styled.span`
	margin: 0 1rem .5rem 0;
	display: inline-block;
	color: ${({ theme }) => theme.gray600};
	position: relative;
	padding-left: 2.5rem;
	min-height: 2rem;
`;

export const Text = styled.span`
	font-size: .875rem;
	line-height: .875rem;
	padding: 0.5rem 0 0;
	display: inline-block;
`;

export const Circle = styled.span`
	width: 2rem;
	height: 2rem;
	position: absolute;
	left: 0;
	border-radius: 50%;
	border: 1px solid ${({ theme }) => theme.commonBorderColor};
	background-image: url('${({ image }) => image}');
	background-size: cover;
	background-repeat: no-repeat;
	margin-right: 0.5rem;
	display: inline-block;
	vertical-align: middle;
	text-align: center;
	font-size: .75rem;
	line-height: .75rem;
	padding: .625rem 0;

	&:before {
		content: '';
	}
`;
