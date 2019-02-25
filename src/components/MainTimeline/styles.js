import styled from 'styled-components';

export const Container = styled.div`
	padding: 0 18rem 0 6rem;
	width: 100vw;
	height: calc(100vh - 7rem);
	position: relative;
	z-index: 1;
	margin-top: 7rem;

	& .ReactVirtualized__Grid:focus {
		outline: none;
	}
`;
