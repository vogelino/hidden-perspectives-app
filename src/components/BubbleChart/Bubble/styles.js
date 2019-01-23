import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { Text } from '../styles';

export const BubbleLink = styled(NavLink)`
	pointer-events: all;
`;

export const BubbleCircle = styled.circle`
	align-items: center;
	height: ${({ r }) => r * 2}px;
	${({ fill, isHovered, theme }) => {
		if (fill) return '';
		const colorFill = (isHovered ? theme.primaryLight : theme.gray200);
		return `fill: ${colorFill};`;
	}}
	opacity: ${({ isLoading }) => (isLoading ? 0 : 1)};
	filter: url('#image-color-filter');
	font-weight: bold;

    &:hover {
        filter: url('#image-color-filter-hover');
    }
`;

export const BubbleText = styled(Text)`
	${({ hasImage, isHovered }) => hasImage && isHovered && `
		fill: white;
		text-shadow: 0 1px 6px rgba(0, 0, 0, .9);
	`}
`;
