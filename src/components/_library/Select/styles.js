import styled from 'styled-components';
import { Select as SmoothUiSelect } from '@smooth-ui/core-sc';

export const Select = styled(SmoothUiSelect)`
	${({ theme, valid }) => (!valid ? `border-color: ${theme.red};` : '')}

	&:focus {
		${({ theme, valid }) => (!valid ? theme.controlFocus()('red') : '')}
	}
`;

