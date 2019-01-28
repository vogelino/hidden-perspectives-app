import styled from 'styled-components';
import { Text } from '../styles';

export const Container = styled.g`
	pointer-events: all;
	cursor: pointer;
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
	filter: url(${({ isHovered, isPinned }) => ((isHovered || isPinned) ? '#image-color-filter-hover' : '#image-color-filter')});
	font-weight: bold;
`;

export const BubbleText = styled(Text)`
	${({ hasImage, isHovered, isPinned }) => hasImage && (isHovered || isPinned) && `
		opacity: 0;
	`}
`;
