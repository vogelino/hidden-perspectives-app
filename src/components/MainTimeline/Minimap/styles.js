import styled from 'styled-components';
import { mix } from 'polished';
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

export const MonthsContainer = styled(Content)`
	padding-left: 1rem;
`;

export const MonthTooltip = styled.span`
	padding: .5rem .625rem .2rem .625rem;
	font-size: .75rem;
	line-height: .75rem;
	border-radius: 1rem;
	background: ${({ theme }) => theme.primaryLight};
	color: ${({ theme }) => theme.primaryDark};
	position: absolute;
	top: 50%;
	left: calc(100% + .5rem);
	transform: translateY(-20%);
	opacity: 0;
	transition: opacity 200ms ease-out, transform 200ms ease-out;
`;

export const Month = styled.div.attrs({
	style: ({ theme, density }) => ({
		background: mix(density, theme.gray100, theme.gray900),
	}),
})`
	width: 1rem;
	height: ${({ height }) => `${height}%`};
	z-index: ${({ isActive }) => (isActive ? 2 : 1)};
	border-radius: ${({ isActive }) => (isActive ? 1 : 0)}px;
	position: relative;
	transition: z-index 100ms step-end, box-shadow 200ms ease-out, border-radius 200ms ease-out;
	${({ isActive }) => isActive && 'transition: z-index 100ms step-start, box-shadow 200ms ease-out, border-radius 200ms ease-out;'}
	box-shadow: 0 0 0 0 ${({ theme }) => theme.primary}, inset 0 0 0 0 rgba(255,255,255,.2);
	${({ isActive }) => isActive && 'box-shadow: 0 0 0 2px black, inset 0 0 0 1px rgba(255,255,255,.2);'}
	cursor: pointer;

	&:hover {
		box-shadow: 0 0 0 2px ${({ theme }) => theme.primary}, inset 0 0 0 1px rgba(255,255,255,.2);
		border-radius: 1px;
		z-index: 10;
	}

	&:hover ${MonthTooltip} {
		transform: translateY(-50%);
		opacity: 1;
	}
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
	pointer-events: none;
`;

export const Date = styled.div`
	font-size: .875rem;
	line-height: .875rem;
	height: .875rem;
	flex: 0 0 .875rem;
`;
