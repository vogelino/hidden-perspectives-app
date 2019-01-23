import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { Text } from '../styles';

export const BubbleLink = styled(NavLink)`
    pointer-events: all;
`;

export const BubbleCircle = styled.circle`
    align-items: center;
    height: ${({ r }) => r * 2}px;
    fill: ${({ isHovered, theme }) => (isHovered ? theme.primaryLight : theme.gray200)};
    opacity: ${({ isLoading }) => (isLoading ? 0 : 1)};
`;

export const BubbleText = styled(Text)``;
