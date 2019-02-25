import styled from 'styled-components';

export const ScrollWrapper = styled.div`
	position: fixed;
	top: 4.5rem;
	left: 0;
	width: 100%;
	height: 2.5rem;
	background: white;
	z-index: 3;
`;

export const IconContainer = styled.span`
	position: absolute;
	top: 0;
	left: 0;
`;

export const HistoryEntry = styled.span`
	display: inline-block;
	padding: .45rem .5rem .15rem;
	margin: .5rem .5rem 0 0;
	border-radius: 3px;
	font-size: 0.875rem;
	line-height: 0.875rem;
	cursor: pointer;
	opacity: .2;
	transition: color 100ms ease-out, background 100ms ease-out, opacity 100ms ease-out;
	
	&.active {
		color: white;
		background: ${({ theme }) => theme.primary};
		opacity: 1;
		cursor: default;
	}

	&:not(.active):hover {
		color: ${({ theme }) => theme.primaryDark};
		background: ${({ theme }) => theme.primaryLight};

		${IconContainer} {
			mix-blend-mode: luminosity;
		}
	}

	${({ hasIcon }) => hasIcon && `
		position: relative;
		padding-left: 1.6rem;
	`}
`;

export const Container = styled.nav`
	position: relative;
	width: auto;
	padding: 0 2rem;
	background: white;
	white-space: nowrap;
	height: 2.5rem;
	border-bottom: 1px solid ${({ theme }) => theme.commonBorderColor};

	&::-webkit-scrollbar {
		display: none;
	}

	&:hover ${HistoryEntry}:not(.active) {
		opacity: .6;

		&:hover {
			opacity: 1;
		}
	}
`;
