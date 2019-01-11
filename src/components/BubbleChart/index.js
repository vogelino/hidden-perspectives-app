import {
	compose,
	withProps,
	withState,
} from 'recompose';
import * as d3 from 'd3';
import BubbleChart from './BubbleChart';

const calcBubbleLayout = (data, diameter, padding) => {
	const bubbleLayout = d3.pack()
		.size([diameter, diameter])
		.padding(padding);

	const rootNode = d3
		.hierarchy(data)
		.sum((d) => d.value);

	return bubbleLayout(rootNode);
};

const formatItems = (bubblesData, activeId) => {
	const formattedData = Object.keys(bubblesData).map((key) => ({
		...bubblesData[key],
		id: key,
		name: bubblesData[key][0].stakeholderFullName,
		value: bubblesData[key].length,
		id: key,
		isActive: key === activeId,
	}));

	return {
		name: 'protagonists',
		children: formattedData,
	};
};

export default compose(
	withState('hoveredElement', 'setHoveredElement', {
		position: {
			x: 0,
			y: 0,
		},
		text: '',
		visible: false,
	}),
	withProps(({
		items,
		diameter,
		bubblesPadding,
		activeId,
	}) => {
		const formattedItems = formatItems(items, activeId);
		const bubbleLayoutItems = calcBubbleLayout(
			formattedItems,
			diameter,
			bubblesPadding,
		).children;

		return {
			items: formattedItems,
			bubbleLayoutItems,
		};
	}),
)(BubbleChart);
