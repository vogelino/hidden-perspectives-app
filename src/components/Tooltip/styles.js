import styled from 'styled-components';
import Headline from '../_library/Headline';

export const Container = styled.div`
	position: absolute;
	top: calc(100% + 1rem);
	${({ position }) => position}: 0;
	opacity: 0;
	pointer-events: none;
	width: 18rem;
	height: auto;
	padding: 1rem;
	border-radius: .25rem;
	background: ${({ theme }) => theme.gray100};
	z-index: 10;
	text-align: left;
`;

export const Trigger = styled.div`
	position: relative;
	width: 100%;
	height: 100%;

	&:hover ${Container} {
		opacity: 1;
	}
`;

export const Thumbnail = styled.div`
	display: none;
`;

export const Title = styled(Headline)`
	font-size: 1rem;
	line-height: 1.375rem;
	font-weight: bold;
	padding: .5rem 0 .375rem;
	margin: 0;
`;

export const Subtitle = styled(Headline)`
	color: ${({ theme }) => theme.gray600};
	font-size: .875rem;
	line-height: 1rem;
	margin: 0;
`;

export const Summary = styled.p`
	margin: 0;
	font-size: .875rem;
	line-height: 1.125rem;
	font-weight: normal;
`;

