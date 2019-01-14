import {
	compose,
	withProps,
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

const formatItems = (bubblesData) => {
	const formattedData = Object.keys(bubblesData).map((key) => ({
		...bubblesData[key],
		id: key,
		name: bubblesData[key][0].stakeholderFullName,
		value: bubblesData[key].length,
	}));

	return {
		name: 'protagonists',
		children: formattedData,
	};
};

export default compose(
	withProps(({
		items,
		diameter,
		bubblesPadding,
	}) => {
		const formattedItems = formatItems(items);
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
