import styled from 'styled-components';
import { prop } from 'ramda';

export const Container = styled.div`
	float: left;
	border-radius: 4px;
	border: 1px solid ${({ theme }) => theme.gray200};
	margin: 0 1rem .5rem 0;
	width: ${prop('width')}px;
	overflow: hidden;
`;
