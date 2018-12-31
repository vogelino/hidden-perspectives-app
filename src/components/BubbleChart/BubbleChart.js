import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'ramda';
import { Bubble, BubblesWrapper, BubblesLoadingContainer } from './styles';
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

const BubbleChart = ({
	bubbleLayoutItems,
	isLoading,
	diameter,
}) => (
	<BubblesWrapper
		isLoading={isLoading}
		diameter={diameter}
	>
		{
			isEmpty(bubbleLayoutItems)
				? 'no items'
				: (
					<Bubbles
						bubbleLayoutItems={bubbleLayoutItems}
						isLoading={isLoading}
					/>
				)
		}
		<BubblesLoadingContainer isLoading={isLoading}>
			<LoadingIndicator />
		</BubblesLoadingContainer>
	</BubblesWrapper>
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
