import styled from 'styled-components';

export const Container = styled.div`
	padding: 0 18rem 0 6rem;
	width: 100vw;
	height: calc(100vh - 4.5rem);
	overflow-y: auto;
	position: relative;
	z-index: 1;

	& .ReactVirtualized__Grid:focus {
		outline: none;
	}
`;

export const PinNotificationWrapper = styled.div`
	left: calc(50vw - 6rem);
	position: absolute;
	top: 0.5rem;
	transform: translateX(-50%);
	z-index: 11;
`;

