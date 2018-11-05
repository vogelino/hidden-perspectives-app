import styled from 'styled-components';
import 'react-day-picker/lib/style.css';

export const Form = styled.form`
	width: 100%;
`;

export const Separator = styled.hr`
	width: 100%;
	height: 1px;
	border: none;
	border-top: 1px solid ${({ theme }) => theme.gray200};
	margin: 1rem 0;
`;

