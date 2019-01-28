import styled from 'styled-components';
import Headline from '../../_library/Headline';

export const TitleWrapper = styled.div`
	margin: .5rem 0 .3rem 0;
`;

export const Title = styled(Headline)`
	display: inline;
	cursor: pointer;

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

export const SummaryText = styled.p`
	font-size: .875rem;
	line-height: 1.25rem;
	margin: 0;
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
	font-size: ${({ isEvent }) => (isEvent ? '1rem' : '.675rem')};
	margin-right: .5rem;
	vertical-align: middle;
	display: inline-block;
	margin-top: -2px;
	opacity: .8;
	
	&:before {
		content: '${({ isEvent }) => (isEvent ? '●' : '▲')}';
	}
`;
