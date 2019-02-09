import styled from 'styled-components';
import Headline from '../_library/Headline';

export const Container = styled.div`
	width: 100%;
	margin: 0 0 2rem;
	padding: 1rem 0 2rem;
	display: inline-block;
	border-bottom: 1px solid ${({ theme }) => theme.gray200};
`;

export const Title = styled(Headline)`
	font-size: 1.25rem;
	line-height: 1.4rem;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	margin: 0;
	background: ${({ theme }) => theme.primary};
	color: white;
	padding: .4rem .6rem .125rem;
	display: inline-block;
	font-weight: bold;
	border-radius: 2px;
`;

export const Subtitle = styled(Headline)`
	font-size: .875rem;
	line-height: .875rem;
	margin: 0 0 .6rem;
	color: block;
`;
