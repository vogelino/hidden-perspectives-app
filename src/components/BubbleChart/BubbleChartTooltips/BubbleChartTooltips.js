import React from 'react';
import BubbleChartTooltip from '../BubbleChartTooltip';

const Tooltips = ({
	bubbleLayoutItems,
	hoveredElement,
	diameter,
}) => bubbleLayoutItems.map(({
	data: { id, name, value },
	x,
	y,
	r,
}) => {
	const toRelativePosition = (pos) => pos * 100 / diameter;

	return (
		<BubbleChartTooltip
			key={`tooltip-${name}`}
			visible={hoveredElement && hoveredElement.id === id}
			x={toRelativePosition(x)}
			y={toRelativePosition(y + r)}
			text={name}
			value={value}
		/>
	);
});

export default Tooltips;
