import styled from 'styled-components';
import { lighten } from 'polished';
import Headline from '../_library/Headline';

export const Container = styled.div`
	width: 28rem;
	position: fixed;
	bottom: 2rem;
	left: 50%;
	transform: translateX(-50%);
	color: ${({ theme }) => theme.danger};
	background: ${({ theme }) => lighten(0.53, theme.danger)};
	border: 1px solid ${({ theme }) => lighten(0.45, theme.danger)};
	padding: 2rem;
	z-index: 1;
	border-radius: .25rem;
	font-size: 1rem;
	line-height: 1.4rem;
	box-shadow: 0 .5rem 1rem -.25rem rgba(0,0,0,.1);
	text-align: left;
`;

export const CloseButton = styled.span`
	position: absolute;
	top: 2rem;
	right: 2rem;
	cursor: pointer;
	opacity: 1;
	transition: opacity 200ms ease-out;

	&:hover {
		opacity: .6;
	}
`;

export const Title = styled(Headline)`

`;

export const ErrorEl = styled.div`
	padding-top: 1rem;
	border-top: 1px solid ${({ theme }) => lighten(0.45, theme.danger)};

	& > p {
		margin-top: 0;
		margin-bottom: 0.5rem;
	}
`;
