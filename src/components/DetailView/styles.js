import styled from 'styled-components';

export const Container = styled.div`
	display: flex;
	height: 100vh;
	width: 100%;
	position: fixed;
	top: 7rem;
	left: 0;
	z-index: 1;
`;

export const Sidebar = styled.aside`
	flex: 0 0 25rem;
	height: calc(100vh - 7rem);
	background: white;
	position: relative;
	z-index: 1;
	overflow: auto;
`;

export const LeftSidebarContent = styled.div`
	padding: 6rem 2rem 2rem;
`;
