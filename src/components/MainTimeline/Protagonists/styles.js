import styled from 'styled-components';

export const Container = styled.div`
	align-items: center;
	border-left: 1px solid ${({ theme }) => theme.commonBorderColor};
	display: flex;
	height: calc(100vh - 7rem);
	margin-top: 7rem;
	justify-content: center;
	position: fixed;
	right: 0;
	top: 0;
	width: 18rem;
	z-index: 1;
`;

export const BubbleChartWrapper = styled.div`
	position: relative;
	width: 80%;
`;
