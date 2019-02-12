import styled from 'styled-components';

export const Container = styled.div`
	display: flex;
	height: calc(100vh - 4.5rem);
	margin-top: 4.5rem;
	width: 100%;
`;

export const Sidebar = styled.aside`
	flex: 0 0 25rem;
	height: calc(100vh - 4.5rem);
	background: white;
	position: relative;
	z-index: 1;
	overflow: auto;
`;

export const LeftSidebarContent = styled.div`
	padding: 6rem 2rem 2rem;
`;
