import styled from 'styled-components';
import { mix, transparentize } from 'polished';
import { MINIMAP_HEIGHT, MINIMAP_PADDING } from '../../../state/constants';

export const OuterContainer = styled.div`
	width: 6rem;
	height: 100%;
	position: fixed;
	top: 4.5rem;
	left: 0;
	border-right: 1px solid ${({ theme }) => theme.commonBorderColor};
	z-index: 1;
`;

export const InnerContainer = styled.div`
	height: ${MINIMAP_HEIGHT + 4}px;
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
	height: ${MINIMAP_HEIGHT + 4 - (MINIMAP_PADDING * 2)}px;
	margin: ${MINIMAP_PADDING}px 0;
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
	background: ${({ theme }) => transparentize(0.7, theme.gray600)};
	box-shadow: 0 0 0 1px white, inset 0 0 0 1px rgba(255,255,255,.3), 0 0 4px 0 rgba(0,0,0,.25);
	z-index: 2;
`;

export const MonthsContainer = styled(Content)`
	padding-left: 1rem;
`;

export const Month = styled.div.attrs({
	style: ({ theme, density }) => ({
		background: mix(density, theme.gray100, theme.gray900),
	}),
})`
	width: 1rem;
	height: ${({ height }) => `${height}%`};
	z-index: 1;
`;

export const DatesContainer = styled(Content)`
	display: flex;
	flex-direction: column;
	margin-top: -${MINIMAP_HEIGHT + 4 - MINIMAP_PADDING}px;
	height: ${MINIMAP_HEIGHT + 4 - (MINIMAP_PADDING * 2)}px;
	justify-content: space-between;
	text-align: right;
	width: 100%;
	padding: 0 1rem;
	color: ${({ theme }) => theme.gray500};
`;

export const Date = styled.div`
	font-size: .875rem;
	line-height: .875rem;
	height: .875rem;
	flex: 0 0 .875rem;
`;
