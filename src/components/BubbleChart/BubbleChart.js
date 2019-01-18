import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'ramda';
import BubbleChartTooltip from './BubbleChartTooltip';
import { getInitials } from '../../utils/stringUtil';
import {
	Bubble,
	BubbleChartContainer,
	BubblesSvg,
	BubblesLoadingContainer,
	BubbleLink,
	Text,
} from './styles';
import LoadingIndicator from '../LoadingIndicator';

const hoverHandler = (name, item, setHoveredElement, type) => {
	const { pageX, pageY } = item;
	const visible = type === 'enter';

	setHoveredElement({
		position: {
			x: pageX,
			y: pageY,
		},
		text: name,
		visible,
	});
};

const Bubbles = ({
	bubbleLayoutItems,
	isLoading,
	setHoveredElement,
}) => bubbleLayoutItems.map((bubbleData) => {
	const {
		data,
		x,
		y,
		r,
	} = bubbleData;
	const { name, id, isActive } = data;

	const maxFontSize = 16;
	const roundedRadius = Math.round(r);
	const fontSize = roundedRadius <= maxFontSize ? roundedRadius : maxFontSize;

	return (
		<BubbleLink
			to={`/participant/context/${id}`}
			key={`bubble-link-${name}`}
			onMouseEnter={(item) => hoverHandler(name, item, setHoveredElement, 'enter')}
			onMouseLeave={(item) => hoverHandler(name, item, setHoveredElement, 'leave')}
		>
			<Bubble
				key={`bubble-${name}`}
				cx={x}
				cy={y}
				r={r}
				isLoading={isLoading}
				isActive={isActive}
			/>
			<Text
				x={x}
				y={y}
				key={`text-${name}`}
				isLoading={isLoading}
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
	setHoveredElement,
	hoveredElement,
}) => (
	<BubbleChartContainer diameter={diameter}>
		<BubblesSvg
			isLoading={isLoading}
			viewBox={`0 0 ${diameter} ${diameter}`}
			preserveAspectRatio="xMidYMid meet"
		>
			{
				isEmpty(bubbleLayoutItems)
					? <Text x={diameter / 2} y={diameter / 2}>no items</Text>
					: (
						<Bubbles
							bubbleLayoutItems={bubbleLayoutItems}
							isLoading={isLoading}
							setHoveredElement={setHoveredElement}
						/>
					)
			}
		</BubblesSvg>
		<BubblesLoadingContainer isLoading={isLoading}>
			<LoadingIndicator />
		</BubblesLoadingContainer>
		<BubbleChartTooltip hoveredElement={hoveredElement} />
	</BubbleChartContainer>
);

BubbleChart.propTypes = {
	isLoading: PropTypes.bool,
	diameter: PropTypes.number,
	bubbleLayoutItems: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string,
			stakeholderFullName: PropTypes.string,
		}),
	),
	setHoveredElement: PropTypes.func,
	hoveredElement: PropTypes.shape({
		position: PropTypes.shape({
			x: PropTypes.number,
			y: PropTypes.number,
		}),
		text: PropTypes.string,
		visible: PropTypes.bool,
	}),
};

BubbleChart.defaultProps = {
	isLoading: false,
	diameter: 100,
	bubbleLayoutItems: [],
	setHoveredElement: () => {},
	hoveredElement: {
		position: {
			x: 0,
			y: 0,
		},
		text: '',
		visible: false,
	},
};

export default BubbleChart;
