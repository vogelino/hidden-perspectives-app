import styled from 'styled-components';
import { Input as SmoothUiInput } from '@smooth-ui/core-sc';

export const Input = styled(SmoothUiInput)`
	width: 100%;
	${({ theme, valid }) => (!valid ? `border-color: ${theme.red};` : '')}

	&:focus {
		${({ theme, valid }) => (!valid ? theme.controlFocus()('red') : '')}
	}
`;

export const TextArea = styled.textarea`
	width: 100%;
	max-width: 100%;
	min-width: 100%;
`;

