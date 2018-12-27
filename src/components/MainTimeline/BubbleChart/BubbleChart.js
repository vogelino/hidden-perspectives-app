import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import { Bubble, BubblesWrapper } from './styles';

const calcBubbleLayout = (data, diameter, padding = 0) => {
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
		name: bubblesData[key][0].stakeholderFullName,
		value: bubblesData[key].length,
	}));

	return {
		name: 'protagonists',
		children: formattedData,
	};
};

const BubbleChart = ({
	items,
	isLoading,
}) => {
	const diameter = 200;
	const formattedItems = formatItems(items);
	const bubbleLayout = calcBubbleLayout(formattedItems, diameter).children || [];
	const bubbles = bubbleLayout.map((bubbleData) => {
		const {
			data,
			x,
			y,
			r,
		} = bubbleData;
		const keyName = `bubble-${data.name}`;
		return <Bubble key={keyName} x={Math.round(x)} y={Math.round(y)} r={Math.round(r)} />;
	});
	return (
		<div>
			{isLoading ? 'loading timeline …' : <BubblesWrapper diameter={diameter}>{bubbles}</BubblesWrapper> }
		</div>
	);
};

BubbleChart.propTypes = {
	isLoading: PropTypes.bool,
	items: PropTypes.objectOf(
		PropTypes.arrayOf(
			PropTypes.shape({
				id: PropTypes.string.isRequired,
				stakeholderFullName: PropTypes.string.isRequired,
			}),
		),
	),
};

BubbleChart.defaultProps = {
	isLoading: false,
	items: {},
};

export default BubbleChart;
