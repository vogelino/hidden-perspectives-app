import styled from 'styled-components';

export const Form = styled.form`
	width: 100%;
	padding: 40px;
`;

export const Input = styled.input`
	padding: 8px 10px;
	margin: 0 8px 8px 0;
`;

export const TextInput = styled(Input).attrs({ type: 'text' })`
	border: 1px solid #ccc;
	border-radius: 3px;
	background: whitesmoke;
`;

export const SubmitButton = styled(Input).attrs({ type: 'submit' })`
	background: black;
	color: white;
	font-weight: bold;
	border: none;
	border-radius: 3px;
`;

