import styled from 'styled-components';

export const Wrapper = styled.foreignObject`
	position: absolute;
	overflow: visible;
	opacity: ${({ visible }) => (visible ? 1 : 0)};
	transition: opacity 150ms ease-out;
	z-index: 1;
`;

export const Tooltip = styled.div`
	background: ${({ theme }) => theme.primaryLight};
	border: 1px solid white;
	border-radius: 1rem;
	color: ${({ theme }) => theme.primaryDark};
	font-size: .75rem;
	line-height: 1.5rem;
	overflow: hidden;
	padding: 4px 0 0 .85rem;
	position: absolute;
	transform: translateX(-50%) scale(1.25);
	white-space: nowrap;
	z-index: 2;
	top: 90%;
	left: 50%;
	pointer-events: ${({ visible }) => (visible ? 'all' : 'none')};
`;

export const TooltipNumber = styled.span`
	background: ${({ theme }) => theme.primaryDark10};
	border-left: 1px solid ${({ theme }) => theme.primaryDark25};
	margin-left: .75rem;
	padding: 0.5rem 0.75rem 0.5rem 0.65rem;
`;
