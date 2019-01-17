import styled from 'styled-components';

export const Container = styled.div`
	width: 100vw;
	height: calc(100vh - 4.5rem);
	position: fixed;
	top: 4.5rem;
	left: 0;
	background: ${({ theme }) => theme.gray200};
	transition: opacity 200ms ease-out;
	opacity: ${({ show }) => (show ? 1 : 0)};
`;
