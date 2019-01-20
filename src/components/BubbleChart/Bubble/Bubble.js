import React from 'react';
import PropTypes from 'prop-types';
import { getCapsOnlyInitials } from '../../../utils/stringUtil';
import {
	BubbleCircle,
	BubbleLink,
	BubbleText,
} from './styles';

const Bubble = ({
	data,
	x,
	y,
	r,
	setComponentRef,
	hovered,
	setHoveredElement,
	textNodeWidth,
	isLoading,
}) => {
	const { name, id, isActive } = data;

	const maxFontSize = 16;
	const margin = 12;
	const d = Math.round(r * 2);
	const innerD = d - margin;
	let fontSize = maxFontSize;
	const initials = getCapsOnlyInitials(name);
	if (textNodeWidth && textNodeWidth > innerD) {
		fontSize = Math.floor((innerD / textNodeWidth) * fontSize);
		fontSize = Math.min(maxFontSize, fontSize);
	}
	return (
		<BubbleLink
			to={`/participant/context/${id}`}
			onMouseEnter={() => setHoveredElement({ itemType: 'stakeholder', ...data })}
			onMouseLeave={() => setHoveredElement(null)}
		>
			<BubbleCircle
				key={`bubble-${name}`}
				cx={x}
				cy={y}
				r={r}
				isLoading={isLoading}
				isHovered={hovered}
				isActive={isActive}
			/>
			<BubbleText
				x={x}
				y={y}
				key={`text-${name}`}
				isLoading={isLoading}
				isHovered={hovered}
				isActive={isActive}
				fontSize={fontSize}
				ref={setComponentRef}
			>
				{initials}
			</BubbleText>
		</BubbleLink>
	);
};

Bubble.propTypes = {
	data: PropTypes.shape({
		name: PropTypes.string.isRequired,
		id: PropTypes.string.isRequired,
		isActive: PropTypes.bool,
	}).isRequired,
	x: PropTypes.number.isRequired,
	y: PropTypes.number.isRequired,
	r: PropTypes.number.isRequired,
	textNodeWidth: PropTypes.number,
	isLoading: PropTypes.bool,
	hovered: PropTypes.bool,
	setComponentRef: PropTypes.func,
	setHoveredElement: PropTypes.func,
};

Bubble.defaultProps = {
	isLoading: false,
	hovered: false,
	setComponentRef: () => {},
	setHoveredElement: () => {},
	textNodeWidth: undefined,
};

export default Bubble;
