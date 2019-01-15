import styled from 'styled-components';
import {
	Label as SmoothUiLabel,
	ControlFeedback as SmoothUiControlFeedback,
	FormGroup as SmoothUiFormGroup,
} from '@smooth-ui/core-sc';

const withSymbol = (symbol) => `
	position: relative;
	padding-left: 12px;

	&:before {
		content: '${symbol}';
		font-family: 'Georgia';
		font-style: italic;
		font-weight: normal;
		position: absolute;
		top: 0;
		left: 0;
	}
`;

export const FormGroup = styled(SmoothUiFormGroup)`
	margin: 0;
`;

export const Description = styled.p`
	margin: 0.25rem 0 0;
	font-size: 80%;
	color: #6c757d;

	${withSymbol('i')}
`;

export const Label = styled(SmoothUiLabel)`
	display: block;
	outline: none;
`;

export const ControlFeedback = styled(SmoothUiControlFeedback)`
	${withSymbol('!')}
`;

export const OptionalText = styled.small`
	font-size: 80%;
	color: #6c757d;
	float: right;
`;

