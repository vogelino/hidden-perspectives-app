import styled from 'styled-components';

export const Container = styled.fieldset`
	border: none;
	margin: 0 0 4rem;
	padding: 0;

	&:last-of-type {
		margin-bottom: 2rem;
	}
`;

export const Legend = styled.legend`
	margin-bottom: 1rem;
	display: block;
`;
