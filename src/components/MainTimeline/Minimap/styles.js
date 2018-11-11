import styled from 'styled-components';

export const Container = styled.div`
	height: 21rem;
	width: calc(6rem - 1px);
	position: fixed;
	top: calc(50vh - 7rem);
	left: 0;
	background: ${({ theme }) => theme.gray100};
	border: 1px solid ${({ theme }) => theme.commonBorderColor};
	border-right: none;
	border-left: none;
	z-index: 1;
`;

export const Content = styled.div`
	position: relative;
	width: 100%;
	height: 100%;
`;

export const ScrollIndicator = styled.div.attrs({
	style: ({ top, height }) => ({
		top: `${top}%`,
		height: `${height}%`,
	}),
})`
	width: 100%;
	position: absolute;
	left: 0;
	border-radius: 3px;
	border: 1px solid ${({ theme }) => theme.gray900};
	background: rgba(255,255,255,.2);
	box-shadow: 0 0 4px 0 rgba(0,0,0,.25);
`;
