import styled from 'styled-components';
import { Typography } from '@smooth-ui/core-sc';

export const Headline = styled(Typography)`
	font-family: ${({ theme }) => theme.fontFamily};
	line-height: 1.5rem;
`;
