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
	transition: color 200ms ease-out, background 200ms ease-out;

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
	margin-left: 1.5rem;
	margin-right: .875rem;
`;

export const Type = styled.span`
	
`;

export const Item = styled.div`
	margin-bottom: 2rem;

	&.current ${Title} {
		background: ${({ theme }) => theme.primary};
		color: white;
	}

	&.hovered ${Title} {
		background: ${({ theme }) => theme.primaryLight};
		color: ${({ theme }) => theme.primaryDark};
	}

	&:focus {
		outline: none;
	}
`;

export const IconContainer = styled.span`
	left: -3px;	
	position: absolute;
	top: 0;
`;
