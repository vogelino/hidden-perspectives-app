import styled from 'styled-components';

export const Container = styled.div`
	flex: 0 0 28rem;
	height: calc(100vh - 4.5rem);
	background: white;
	position: relative;
	z-index: 1;
	padding: 9rem 2rem 0;
`;

export const AllNoneText = styled.span`
	display: block;
	margin-bottom: 1rem;
	font-size: .875rem;
	cursor: pointer;
	transition: color 200ms ease-out;

	&:hover {
		text-decoration: underline;
	}
`;
