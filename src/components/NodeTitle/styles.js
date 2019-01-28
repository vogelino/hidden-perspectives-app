import styled from 'styled-components';
import Headline from '../_library/Headline';

export const Container = styled.div`
	width: 37rem;
	margin: 0 auto;
	text-align: center;
	padding: 1rem 0;
	display: inline-block;
`;

export const Title = styled(Headline)`
	font-size: 1.125rem;
	line-height: 1.4rem;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	margin: 0;
`;

export const Subtitle = styled(Headline)`
	font-size: .875rem;
	line-height: .875rem;
	margin: 0 0 .25rem;
	color: ${({ theme }) => theme.primaryDark};
`;
