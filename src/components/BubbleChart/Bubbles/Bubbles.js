import React from 'react';
import { isHovered } from '../../../utils/timelineUtil';
import Bubble from '../Bubble';

const Bubbles = ({
	bubbleLayoutItems,
	hoveredElement,
	pinnedElement,
	images,
	setPinnedElement,
	activeElementId,
	...props
}) => bubbleLayoutItems.map((bubbleData) => {
	const hovered = isHovered(bubbleData.data, hoveredElement, 'stakeholder');
	const pinned = isHovered(bubbleData.data, pinnedElement, 'stakeholder');
	return (
		<Bubble
			key={`bubble-link-${bubbleData.data.name}`}
			hovered={hovered}
			pinned={!hoveredElement && pinned}
			isActive={activeElementId === bubbleData.data.id}
			image={images.find(({ id }) => id === bubbleData.data.id)}
			clickHandler={(pinEl) => {
				if (pinnedElement && pinnedElement.id === pinEl.id) return setPinnedElement(null);
				return setPinnedElement(pinEl);
			}}
			{...bubbleData}
			{...props}
		/>
	);
});

export default Bubbles;
