import React from 'react';
import { isHovered } from '../../../utils/timelineUtil';
import Bubble from '../Bubble';

const Bubbles = ({
	bubbleLayoutItems,
	hoveredElement,
	images,
	activeElementId,
	...rest
}) => bubbleLayoutItems.map((bubbleData) => {
	const hovered = isHovered(bubbleData.data, hoveredElement, 'stakeholder');
	return (
		<Bubble
			key={`bubble-link-${bubbleData.data.name}`}
			hovered={hovered}
			isActive={activeElementId === bubbleData.data.id}
			image={images.find(({ id }) => id === bubbleData.data.id)}
			{...bubbleData}
			{...rest}
		/>
	);
});

export default Bubbles;
