import styled from 'styled-components';

export const Container = styled.div`
	width: 100vw;
	height: calc(100vh - 4.5rem);
	position: fixed;
	top: 4.5rem;
	left: 0;
	background: ${({ theme }) => theme.gray200};
	transition: opacity 200ms ease-out;
	opacity: ${({ show }) => (show ? 1 : 0)};
	text-align: left;
`;

export const Content = styled.div`
	width: 38rem;
	margin: 0 auto;
`;

export const Results = styled.ul`
	list-style: none;
	padding: 0;
`;

export const Result = styled.li`
	position: relative;
	padding: .875rem 1rem .625rem 2rem;
	margin-bottom: 0.25rem;
	background: white;
	border-radius: .25rem;
	font-size: .875rem;
	line-height: .875rem;
	border: 1px solid ${({ theme }) => theme.commonBorderColor};
	cursor: pointer;
	background-image: url("${({ type }) => `/icons/${type}.svg`}");
	background-size: 1rem 1rem;
	background-position: .5rem center;
	background-repeat: no-repeat;
	box-shadow: 0 0 0 rgba(0, 0, 0, 0),
		inset 0 0 0 0 ${({ theme }) => theme.primaryLight};
	transition: border 200ms ease-out,
		box-shadow 200ms ease-out;

	&.highlighted {
		border-color: ${({ theme }) => theme.primary};
		box-shadow: 0 6px 20px -6px rgba(0, 0, 0, 0.2),
			inset 0 0 0 1px ${({ theme }) => theme.primary};
	}
`;
