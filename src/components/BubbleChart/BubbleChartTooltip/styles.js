import styled from 'styled-components';

export const Name = styled.span`
`;

export const TooltipNumber = styled.span`
	background: ${({ theme }) => theme.primaryDark10};
	border-left: 1px solid ${({ theme }) => theme.primaryDark25};
	margin-left: .75rem;
	padding: 0.5rem 0.75rem 0.5rem 0.65rem;
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
	pointer-events: none;

	&:hover > ${Name} {
		text-decoration: underline;
	}
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
