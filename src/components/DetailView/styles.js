import styled from 'styled-components';

export const Container = styled.div`
	display: flex;
	height: calc(100vh - 4.5rem);
	margin-top: 4.5rem;
	width: 100%;
`;

export const LeftSidebar = styled.aside`
	flex: 0 0 28rem;
	height: calc(100vh - 8rem);
	background: white;
	position: relative;
	z-index: 1;
	padding: 6rem 2rem 0;
`;

export const RightSidebar = styled.aside`
	flex: 0 0 28rem;
	height: calc(100vh - 4.5rem);
	background: white;
	position: relative;
	z-index: 1;
`;
