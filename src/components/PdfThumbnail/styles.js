import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { prop } from 'ramda';

export const Container = styled(NavLink)`
	float: left;
	border-radius: 4px;
	border: 1px solid ${({ theme }) => theme.gray200};
	margin: 0 1rem .5rem 0;
	width: ${prop('width')}px;
	min-height: ${prop('width')}px;
	overflow: hidden;
	max-height: 90px;
`;
