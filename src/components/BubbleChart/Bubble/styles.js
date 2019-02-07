import styled from 'styled-components';
import { Text } from '../styles';

export const Container = styled.g`
	pointer-events: all;
	cursor: pointer;
`;

const getFilterUrl = ({ isHovered, isPinned, isActive }) => {
	if (isHovered || isPinned) return '#image-color-filter-hover';
	if (isActive) return 'none';
	return '#image-color-filter';
};

export const BubbleActiveCircle = styled.circle.attrs({
	style: ({ r }) => ({
		height: `${r * 2}px`,
	}),
})`
	stroke-width: 4px;
	stroke: ${({ theme }) => theme.primary};
`;

export const BubbleCircle = styled.circle.attrs({
	style: ({ r }) => ({
		height: `${r * 2}px`,
	}),
})`
	align-items: center;
	${({
		fill,
		isHovered,
		isPinned,
		theme,
	}) => {
		if (fill) return '';
		const colorFill = ((isHovered || isPinned) ? theme.primaryLight : theme.gray200);
		return `fill: ${colorFill};`;
	}}
	opacity: ${({ isLoading }) => (isLoading ? 0 : 1)};
	filter: url(${getFilterUrl});
	font-weight: bold;
`;

export const BubbleText = styled(Text)`
	${({
		hasImage,
		isHovered,
		isPinned,
		isActive,
	}) => hasImage && (isHovered || isPinned || isActive) && `
		opacity: 0;
	`}
	user-select: none;
`;
