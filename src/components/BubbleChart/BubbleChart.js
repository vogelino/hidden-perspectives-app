import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'ramda';
import { getInitials } from '../../utils/stringUtil';
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
}) => bubbleLayoutItems.map((bubbleData) => {
	const {
		data,
		x,
		y,
		r,
	} = bubbleData;
	const { name, id } = data;
	const maxFontSize = 16;
	const roundedRadius = Math.round(r);
	const fontSize = roundedRadius <= maxFontSize ? roundedRadius : maxFontSize;

	return (
		<BubbleLink
			xlinkHref={`/participant/context/${id}`}
			target="_top"
			key={`bubble-link-${name}`}
		>
			<Bubble
				key={`bubble-${name}`}
				cx={x}
				cy={y}
				r={r}
				isLoading={isLoading}
			/>
			<Text
				x={x}
				y={y}
				key={`text-${name}`}
				isLoading={isLoading}
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
}) => (
	<BubbleChartContainer>
		<BubblesWrapper
			isLoading={isLoading}
			diameter={diameter}
		>
			{
				isEmpty(bubbleLayoutItems)
					? <Text x={diameter / 2} y={diameter / 2}>no items</Text>
					: (
						<Bubbles
							bubbleLayoutItems={bubbleLayoutItems}
							isLoading={isLoading}
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
	bubbleLayoutItems: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string,
			stakeholderFullName: PropTypes.string,
		}),
	),
};

BubbleChart.defaultProps = {
	isLoading: false,
	diameter: 100,
	bubbleLayoutItems: [],
};

export default BubbleChart;
