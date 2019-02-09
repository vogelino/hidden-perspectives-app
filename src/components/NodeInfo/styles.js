import styled from 'styled-components';
import { transparentize } from 'polished';
import Headline from '../_library/Headline';

export const Container = styled.div`
	width: 100%;
	margin: 0 0 2rem;
	padding: 0 0 2rem;
	display: inline-block;
	position: relative;
	border-bottom: 1px solid ${({ theme }) => theme.gray200};
`;

export const Title = styled(Headline)`
	font-size: 1.25rem;
	line-height: 1.9rem;
	margin: 0;
	background: ${({ theme }) => theme.primary};
	color: white;
	padding: .1rem .6rem 0;
	display: inline;
	border-radius: 2px;
	box-decoration-break: clone;
`;

export const Subtitle = styled(Headline)`
	font-size: .875rem;
	line-height: .875rem;
	padding: 0 0 .6rem;
`;

export const DescriptionLimitGradient = styled.span`
	width: 100%;
	height: 4rem;
	position: absolute;
	bottom: 2rem;
	left: 0;
	background: linear-gradient(to bottom, rgba(255,255,255,0) 0%,rgba(255,255,255,1) 100%);
	z-index: 1;
	pointer-events: none;
	opacity: 0;
	transition: opacity 200ms ease-out;
`;

export const ShowMoreText = styled.span`
	position: absolute;
	bottom: 2.5rem;
	left: 50%;
	transform: translateX(-50%);
	padding: .5rem 1rem .25rem;
	border-radius: 1rem;
	background: white;
	color: ${({ theme }) => theme.dark};
	z-index: 2;
	box-shadow: 0 .25rem 1rem ${({ theme }) => transparentize(0.9, theme.primary)}; 
	transition: color 200ms ease-out, background 200ms ease-out, opacity 200ms ease-out;
	opacity: 0;
	pointer-events: none;
`;

export const Description = styled.p`
	font-size: .875rem;
	line-height: 1.25rem;
	cursor: pointer;
	transition: color 200ms ease-out;
	overflow: hidden;
	margin: 1.5rem 0 0.5rem;

	&:hover {
		color: ${({ theme }) => theme.dark}
	}

	&:hover ${ShowMoreText} {
		background: ${({ theme }) => theme.primaryLight};
		color: ${({ theme }) => theme.primaryDark};
	}
	
	${({ expanded, theme }) => !expanded && `
		color: ${theme.gray600};

		& ${DescriptionLimitGradient},
		& ${ShowMoreText} {
			opacity: 1;
		}
	`};
`;
