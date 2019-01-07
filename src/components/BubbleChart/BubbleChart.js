import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'ramda';
import { getInitials } from '../../utils/stringUtil';
import { isHovered } from '../../utils/timelineUtil';
import {
	Bubble,
	BubbleChartContainer,
	BubblesWrapper,
	BubblesLoadingContainer,
	BubbleLink,
	Text,
} from './styles';
import LoadingIndicator from '../LoadingIndicator';

const Bubbles = ({
	bubbleLayoutItems,
	isLoading,
	hoveredElement,
	setHoveredElement,
}) => bubbleLayoutItems.map((bubbleData) => {
	const {
		data,
		x,
		y,
		r,
	} = bubbleData;

	const { name, id } = data;
	const hovered = isHovered(data, hoveredElement, 'stakeholder');

	return (
		<BubbleLink
			href={`/participant/context/${id}`}
			key={`bubble-link-${name}`}
		>
			<Bubble
				key={`bubble-${name}`}
				cx={x}
				cy={y}
				r={r}
				isLoading={isLoading}
				isHovered={hovered}
				onMouseEnter={() => setHoveredElement({ itemType: 'stakeholder', ...data })}
				onMouseLeave={() => setHoveredElement(null)}
			/>
			<Text
				x={x}
				y={y}
				key={`text-${name}`}
				isLoading={isLoading}
				isHovered={hovered}
			>
				{getInitials(name)}
			</Text>
		</BubbleLink>
	);
});

const BubbleChart = ({
	bubbleLayoutItems,
	isLoading,
	diameter,
	hoveredElement,
	setHoveredElement,
}) => (
	<BubbleChartContainer>
		<BubblesWrapper
			isLoading={isLoading}
			diameter={diameter}
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
		</BubblesWrapper>
		<BubblesLoadingContainer isLoading={isLoading}>
			<LoadingIndicator />
		</BubblesLoadingContainer>
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
