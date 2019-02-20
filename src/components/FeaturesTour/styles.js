import styled, { createGlobalStyle, css } from 'styled-components';
import { darken, transparentize } from 'polished';
import Headline from '../_library/Headline';
import Button from '../_library/Button';

const iconButtonCommonStyles = css`
	background: none;
	border: none;
	width: 2rem;
	height: 2rem;
	text-align: center;
	padding: 0;
	display: inline-block;
	cursor: pointer;
	transition: color 200ms ease-out, background 200ms ease-out;
	border-radius: 50%;
	font-weight: bold;
	font-family: Arial, sans-serif;
	outline: none;
`;

export const GlobalTourStyles = createGlobalStyle`
	.reactour__mask rect[fill="#000000"] {
		fill: ${({ theme }) => darken(0.15, theme.primary)};
	}

	.reactour__dot:not(.reactour__dot--is-active) {
		color: ${({ theme }) => theme.gray400};
		transition: color 100ms ease-out, background 100ms ease-out, transform 100ms ease-out;

		&:hover {
			border: 2px solid ${({ theme }) => theme.primaryLight};
			background: ${({ theme }) => theme.primaryDark};
			transform: scale(2);
		}
	}

	.reactour__helper {
		border-right: 4px;
		box-shadow: 0 0 0 1px ${({ theme }) => transparentize(0.9, theme.gray900)}, 0 .5rem 1rem rgba(0,0,0,.1);
		padding: 0;

		> div[data-tour-elem="controls"] {
			margin: 0;
			padding: 1.25rem 2rem;
			border-top: 1px solid ${({ theme }) => theme.gray200};

			> nav[data-tour-elem="navigation"] {
				margin: 0 auto;
			}

			> button {
				width: 1rem;
				height: 1rem;
				flex: 0 0 1rem;
				display: inline-block;
				padding: .5rem;
				border-radius: 50%;
				box-sizing: content-box;
				cursor: pointer;
				color: ${({ theme }) => theme.gray600};
				transition: color 200ms ease-out, background 200ms ease-out;

				&:disabled {
					color: ${({ theme }) => theme.gray300};
				}

				&:not(:disabled):hover {
					color: ${({ theme }) => theme.primaryDark};
					background: ${({ theme }) => theme.primaryLight};
				}

				&[data-tour-elem="right-arrow"] {
					float: right;
				}

				&[data-tour-elem="left-arrow"] {
					float: left;
				}
			}
		}
	}
`;

export const StepContainer = styled.div`
	padding: 2rem;
`;

export const StepHeadline = styled(Headline)``;

export const StepContent = styled.p`
	font-size: .875rem;
	line-height: 1.25rem;
	margin-bottom: 0;
`;

export const StepCloseButton = styled.button`
	position: absolute;
	top: 1.7rem;
	right: 1.3rem;
	line-height: 2.1rem;
	${iconButtonCommonStyles}
	color: ${({ theme }) => theme.gray600};
	background: white;

	&:hover {
		color: ${({ theme }) => theme.primaryDark};
		background: ${({ theme }) => theme.primaryLight};
	}
`;

export const SkipLink = styled.div`
	text-align: right;
	margin-top: 1rem;
	font-size: .875rem;
	line-height: .875rem;
	position: absolute;
	bottom: -2rem;
	width: calc(100% - 4rem);
	color: white;
	cursor: pointer;

	&:hover {
		text-decoration: underline;
		text-decoration: underline;
	}
`;

export const StepButton = styled(Button)`
	margin-top: 2rem;
	width: 100%;
`;

export const StepImage = styled.div`
	height: 8rem;
	background-image: url("${({ src }) => src}");
	background-position: center;
	background-size: cover;
	background-color: white;
	border-radius: 4px 4px 0 0;
	border-bottom: 1px solid ${({ theme }) => theme.gray200};
`;
