import styled from 'styled-components';
import ReactSelect from 'react-select';

export const Select = styled(ReactSelect)`
	${({ theme, valid }) => (!valid ? `border-color: ${theme.red};` : '')}

	&:focus {
		${({ theme, valid }) => (!valid ? theme.controlFocus()('red') : '')}
	}
`;

