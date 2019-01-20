import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'ramda';
import { isHovered } from '../../utils/timelineUtil';
import {
	BubbleChartContainer,
	BubblesSvg,
	BubblesLoadingContainer,
	Text,
} from './styles';
import Bubble from './Bubble';
import BubbleChartTooltip from './BubbleChartTooltip';
import LoadingIndicator from '../LoadingIndicator';

const Tooltips = ({
	bubbleLayoutItems,
	hoveredElement,
	diameter,
}) => bubbleLayoutItems.map((bubbleData) => {
	const {
		data,
		x,
		y,
		r,
	} = bubbleData;

	const { name, value } = data;
	const hovered = isHovered(data, hoveredElement, 'stakeholder');
	const toRelativePosition = (pos) => pos * 100 / diameter;

	return (
		<BubbleChartTooltip
			key={`tooltip-${name}`}
			visible={hovered}
			x={toRelativePosition(x)}
			y={toRelativePosition(y + r)}
			text={name}
			value={value}
		/>
	);
});

const Bubbles = ({
	bubbleLayoutItems,
	hoveredElement,
	...props
}) => bubbleLayoutItems.map((bubbleData) => (
	<Bubble
		key={`bubble-link-${bubbleData.data.name}`}
		hovered={isHovered(bubbleData.data, hoveredElement, 'stakeholder')}
		{...bubbleData}
		{...props}
	/>
));

const BubbleChart = ({
	bubbleLayoutItems,
	isLoading,
	diameter,
	hoveredElement,
	setHoveredElement,
}) => (
	<BubbleChartContainer diameter={diameter}>
		<BubblesSvg
			isLoading={isLoading}
			viewBox={`0 0 ${diameter} ${diameter}`}
			preserveAspectRatio="xMidYMid meet"
		>
			{
				isEmpty(bubbleLayoutItems) && !isLoading
					? <Text x={diameter / 2} y={diameter / 2}>no items</Text>
					: (
						<Bubbles
							bubbleLayoutItems={bubbleLayoutItems}
							isLoading={isLoading}
							hoveredElement={hoveredElement}
							setHoveredElement={setHoveredElement}
						/>
					)
			}
		</BubblesSvg>
		<BubblesLoadingContainer isLoading={isLoading}>
			<LoadingIndicator />
		</BubblesLoadingContainer>
		<Tooltips
			bubbleLayoutItems={bubbleLayoutItems}
			hoveredElement={hoveredElement}
			diameter={diameter}
		/>
	</BubbleChartContainer>
);

BubbleChart.propTypes = {
	isLoading: PropTypes.bool,
	diameter: PropTypes.number,
	setHoveredElement: PropTypes.func,
	bubbleLayoutItems: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string,
			stakeholderFullName: PropTypes.string,
		}),
	),
	hoveredElement: PropTypes.shape({
		id: PropTypes.string.isRequired,
		itemType: PropTypes.string.isRequired,
	}),
};

BubbleChart.defaultProps = {
	isLoading: false,
	diameter: 100,
	bubbleLayoutItems: [],
	hoveredElement: null,
	setHoveredElement: () => {},
};

export default BubbleChart;
