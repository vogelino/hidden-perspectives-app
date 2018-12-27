import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import { Bubble, BubblesWrapper, BubblesLoadingContainer } from './styles';
import LoadingIndicator from '../../LoadingIndicator';

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
		name: bubblesData[key][0].stakeholderFullName,
		value: bubblesData[key].length,
	}));

	return {
		name: 'protagonists',
		children: formattedData,
	};
};

const Bubbles = ({
	items,
	diameter,
	padding,
	isLoading,
}) => {
	const formattedItems = formatItems(items);
	const bubbleLayout = calcBubbleLayout(formattedItems, diameter, padding).children || [];
	return bubbleLayout.map((bubbleData) => {
		const {
			data,
			x,
			y,
			r,
		} = bubbleData;

		const { name } = data;
		const keyName = `bubble-${name}`;
		return (
			<Bubble
				key={keyName}
				x={Math.round(x)}
				y={Math.round(y)}
				r={Math.round(r)}
				isLoading={isLoading}
			>
				{name}
			</Bubble>
		);
	});
};

const BubbleChart = ({
	items,
	isLoading,
	fetchingProtagonists,
	diameter,
	bubblesPadding,
}) => (
	<BubblesWrapper
		isLoading={fetchingProtagonists}
		diameter={diameter}
	>
		<Bubbles
			items={items}
			diameter={diameter}
			padding={bubblesPadding}
			isLoading={fetchingProtagonists}
		/>
		<BubblesLoadingContainer isLoading={isLoading || fetchingProtagonists}>
			<LoadingIndicator />
		</BubblesLoadingContainer>
	</BubblesWrapper>
);

BubbleChart.propTypes = {
	isLoading: PropTypes.bool,
	fetchingProtagonists: PropTypes.bool,
	bubblesPadding: PropTypes.number,
	diameter: PropTypes.number,
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
	diameter: 100,
	bubblesPadding: 0,
	fetchingProtagonists: false,
	items: {},
};

export default BubbleChart;
