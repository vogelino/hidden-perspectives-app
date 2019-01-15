import styled from 'styled-components';
import Headline from '../_library/Headline';

export const Container = styled.div`
	flex: 0 0 32rem;
	height: calc(100vh - 8rem);
	background: white;
`;

export const Items = styled.div`
	width: 100%;
	height: calc(100vh - 8rem);
	position: relative;
	overflow-x: hidden;
	overflow-y: auto;
	padding: 2rem;
	scroll-behavior: smooth;
`;

export const TitleWrapper = styled.div``;

export const Title = styled(Headline)`
	font-weight: bold;
	margin: .5rem 0 .3rem 0;
	display: inline;
	cursor: pointer;
`;

export const SecondaryInfo = styled(Headline)`
	color: ${({ theme }) => theme.gray600};	
	font-size: .875rem;
	margin: 0;
`;

export const ItemDate = styled.span`
	margin-right: .875rem;
`;

export const Type = styled.span`
	
`;

export const Summary = styled.p`
	font-size: .875rem;
	line-height: 1.25rem;
	margin: 0;
`;

export const Item = styled.div`
	margin-bottom: 2rem;

	&.hovered ${Title} {
		background: ${({ theme }) => theme.primaryLight};
		color: ${({ theme }) => theme.primaryDark};
	}
`;
