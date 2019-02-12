import styled from 'styled-components';
import Headline from '../../_library/Headline';

export const TitleWrapper = styled.div`
	margin: .3rem 0;
`;

export const Title = styled(Headline)`
	display: inline;
	cursor: pointer;
	box-decoration-break: clone;
	border-radius: 2px;
	padding: 0 .4rem;
	margin-left: -0.4rem;

	a {
		text-decoration: none;
		color: inherit;
	}
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

export const Item = styled.div`
	margin-bottom: 2rem;

	&.pinned ${Title},
	&.hovered ${Title} {
		background: ${({ theme }) => theme.primaryLight};
		color: ${({ theme }) => theme.primaryDark};
	}
`;

export const Symbol = styled.span`
	font-size: ${({ isEvent }) => (isEvent ? '1.2rem' : '.8rem')};
	line-height: .8rem;
	margin-right: .5rem;
	display: inline-block;
	opacity: .8;
	font-family: Arial, sans-serif;
	
	&:before {
		content: '${({ isEvent }) => (isEvent ? '●' : '▲')}';
	}
`;
