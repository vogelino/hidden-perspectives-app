import styled from 'styled-components';
import Headline from '../_library/Headline';
import Button from '../_library/Button';

export const Container = styled.div`
	position: absolute;
	${({ position }) => position}: 0;
	opacity: 0;
	pointer-events: none;
	width: 20rem;
	height: auto;
	padding: 1rem 0 0;
	z-index: 10;
`;

export const Content = styled.div`
	padding: 1rem;
	border-radius: .25rem;
	background: white;
	z-index: 10;
	text-align: left;
	box-shadow: 0 .5rem 1rem rgba(0,0,0,.1); 
`;

export const Trigger = styled.div`
	position: relative;
	width: 100%;
	height: 100%;

	&:hover ${Container} {
		opacity: 1;
		pointer-events: all;
	}
`;

export const Thumbnail = styled.div`
	display: none;
`;

export const Subtitle = styled(Headline)`
	color: ${({ theme }) => theme.gray600};
	font-size: .875rem;
	line-height: 1rem;
	margin: 0 0 .5rem 0;
`;

export const Summary = styled.p`
	margin: 0;
	font-size: .875rem;
	line-height: 1.125rem;
	font-weight: normal;
`;

export const ExploreButton = styled(Button)`
	margin-top: 0.5rem;
`;
