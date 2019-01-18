import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'ramda';
import { getInitials } from '../../utils/stringUtil';
import { isHovered } from '../../utils/timelineUtil';
import {
	Bubble,
	BubbleChartContainer,
	BubblesSvg,
	BubblesLoadingContainer,
	BubbleLink,
	Text,
} from './styles';
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

	const { name, id, isActive } = data;
	const hovered = isHovered(data, hoveredElement, 'stakeholder');
	const maxFontSize = 12;
	const roundedRadius = Math.round(r);
	const fontSize = roundedRadius <= maxFontSize ? roundedRadius : maxFontSize;

	return (
		<BubbleLink
			to={`/participant/context/${id}`}
			key={`bubble-link-${name}`}
			onMouseEnter={() => setHoveredElement({ itemType: 'stakeholder', ...data })}
			onMouseLeave={() => setHoveredElement(null)}
		>
			<Bubble
				key={`bubble-${name}`}
				cx={x}
				cy={y}
				r={r}
				isLoading={isLoading}
				isHovered={hovered}
				isActive={isActive}
			/>
			<Text
				x={x}
				y={y}
				key={`text-${name}`}
				isLoading={isLoading}
				isHovered={hovered}
				isActive={isActive}
				fontSize={fontSize}
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
