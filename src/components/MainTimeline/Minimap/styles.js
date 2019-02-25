import styled from 'styled-components';
import { mix } from 'polished';

export const OuterContainer = styled.div`
	width: 6rem;
	height: 100%;
	position: fixed;
	top: 7rem;
	left: 0;
	border-right: 1px solid ${({ theme }) => theme.commonBorderColor};
	z-index: 4;
`;

export const InnerContainer = styled.div`
	height: calc(100vh - 7rem);
	width: calc(6rem - 1px);
	position: fixed;
	top: 7rem;
	left: 0;
	/* background: ${({ theme }) => theme.gray100}; */
	z-index: 1;
`;

export const Content = styled.div`
	position: relative;
	width: 100%;
	height: 100%;
	padding: 1rem 0;
`;

export const YearsContainer = styled(Content)`
	padding: 0 0 0 1rem;
`;

export const YearTooltip = styled.span`
	font-size: .75rem;
	line-height: .75rem;
	border-radius: 1rem;
	background: ${({ theme }) => theme.primaryLight};
	color: ${({ theme }) => theme.primaryDark};
	position: absolute;
	top: 50%;
	left: calc(100% + .5rem);
	transform: translateY(-50%);
	opacity: 0;
	transition: opacity 200ms ease-out, color 200ms ease-out, background 200ms ease-out;
	white-space: nowrap;
`;

const TooltipSpan = styled.span`
	padding: .5rem .625rem .2rem .625rem;
	display: inline-block;
`;

export const YearName = styled(TooltipSpan)`
	width: 51px;
`;

export const YearCount = styled(TooltipSpan)`
	background: ${({ theme }) => theme.primaryDark10};
	border-left: 1px solid ${({ theme }) => theme.primaryDark25};
	border-radius: 0 1rem 1rem 0;
	transition: border-left-color 200ms ease-out, background 200ms ease-out;
`;

export const Year = styled.div.attrs({
	style: ({ theme, density }) => ({
		background: mix(density, 'white', theme.primary),
	}),
})`
	width: 1.25rem;
	height: ${({ height }) => `${height}%`};
	z-index: ${({ isActive }) => (isActive ? 2 : 1)};
	border-radius: ${({ isActive }) => (isActive ? 1 : 0)}px;
	position: relative;
	transition: z-index 100ms step-end, box-shadow 200ms ease-out, border-radius 200ms ease-out;
	${({ isActive }) => isActive && 'transition: z-index 100ms step-start, box-shadow 200ms ease-out, border-radius 200ms ease-out;'}
	box-shadow: 0 0 0 0 ${({ theme }) => theme.primary}, inset 0 0 0 0 rgba(255,255,255,.2);
	cursor: pointer;

	&:hover {
		box-shadow: 0 0 0 2px ${({ theme }) => theme.primary}, inset 0 0 0 1px rgba(255,255,255,.2);
		border-radius: 1px;
		z-index: 10;
	}

	${({ isActive, theme }) => isActive && `
		box-shadow: 0 0 0 2px ${theme.primary}, inset 0 0 0 1px rgba(255,255,255,.2);
		cursor: default;

		& ${YearTooltip} {
			opacity: 1;
			background: ${theme.primary};
			color: white;

			& ${YearCount} {
				background: rgba(255,255,255,.1);
				border-left-color: rgba(255,255,255,.2);
			}
		}
	`} 

	&:hover ${YearTooltip} {
		opacity: 1;
	}
`;

export const DatesContainer = styled(Content)`
	display: flex;
	flex-direction: column;
	height: 100%;
	justify-content: space-between;
	text-align: right;
	width: 100%;
	padding: 1rem 1rem 1rem 0;
	color: ${({ theme }) => theme.gray500};
	pointer-events: none;
	position: absolute;
	top: 0;
	left: 0;
`;

export const Date = styled.div`
	font-size: .875rem;
	height: ${({ h }) => `${h}%`};
	flex: 0 0 ${({ h }) => `${h}%`};
	padding-top: .25rem;
	opacity: 0;

	&:first-child,
	&:last-child,
	&:nth-child(6n) {
		opacity: 1;
	}
`;
