import styled from 'styled-components';

export const TooltipNumber = styled.span`
	background: ${({ theme }) => theme.primaryDark10};
	border-left: 1px solid ${({ theme }) => theme.primaryDark25};
	margin-left: .75rem;
	padding: 0.5rem 0.75rem 0.5rem 0.65rem;
`;

export const Tooltip = styled.div.attrs(({ y, x }) => ({
	style: {
		top: `${y}%`,
		left: `${x}%`,
	},
}))`
	background: ${({ theme }) => theme.primaryLight};
	border: 1px solid white;
	border-radius: 1rem;
	color: ${({ theme }) => theme.primaryDark};
	font-size: .75rem;
	line-height: 1.5rem;
	opacity: ${({ visible }) => (visible ? 1 : 0)};
	overflow: hidden;
	padding: 4px 0 0 .85rem;
	pointer-events: none;
	position: absolute;
	transform: translate(-50%, -4px);
	transition: opacity 150ms ease-out;
	white-space: nowrap;
	z-index: 2;
`;

export const Wrapper = styled.foreignObject`
	position: absolute;
	overflow: visible;
	z-index: 1;
	transition: opacity 200ms ease-out;
	opacity: 0;

	&:hover {
		opacity: 1;
	}

	&:hover ${Tooltip} {
		pointer-events: all;
	}
`;
