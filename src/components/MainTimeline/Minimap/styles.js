import styled from 'styled-components';
import { mix, transparentize } from 'polished';
import { MINIMAP_HEIGHT, MINIMAP_PADDING } from '../../../state/constants';

export const Container = styled.div`
	padding: ${MINIMAP_PADDING}px 0;
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
	background: ${({ theme }) => transparentize(0.7, theme.gray600)};
	box-shadow: 0 0 0 1px white, inset 0 0 0 1px rgba(255,255,255,.3), 0 0 4px 0 rgba(0,0,0,.25);
	z-index: 2;
`;

export const EventsContainer = styled(Content)``;
export const Event = styled.div.attrs({
	style: ({ top }) => ({
		top: `${top}px`,
	}),
})`
	position: absolute;
	left: ${({ left }) => left}px;
	width: 6px;
	height: 6px;
	border-radius: 50%;
	transform: translateY(1px);
	background: ${({ theme, density }) => mix(density, theme.gray200, theme.gray900)};
	z-index: 1;
`;
