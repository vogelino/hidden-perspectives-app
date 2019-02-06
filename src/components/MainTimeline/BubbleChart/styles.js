import styled, { css } from 'styled-components';

export const BubbleTextWrapper = styled('div')`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
`;

export const BubbleText = styled('p')`
	text-align: center;
	margin: 0;
	font-size: 13px;
	line-height: 14px;
	z-index: 10;
	${(props) =>
		props.noBreak &&
		css`
			white-space: nowrap;
		`}
`;

export const ChartWrapper = styled('div')`
	right: 0;
	position: absolute;
	z-index: 1;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
`;
