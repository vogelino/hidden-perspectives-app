import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'ramda';
import {
	BubbleChartContainer,
	BubblesSvg,
	BubblesLoadingContainer,
} from './styles';
import BubbleChartTooltips from './BubbleChartTooltips';
import BubbleChartImages from './BubbleChartImages';
import Bubbles from './Bubbles';
import LoadingIndicator from '../LoadingIndicator';

const BubbleChart = ({
	bubbleLayoutItems,
	isLoading,
	diameter,
	hoveredElement,
	setHoveredElement,
	pinnedElement,
	setPinnedElement,
	activeElementId,
	images,
}) => (
	<BubbleChartContainer diameter={diameter}>
		<BubblesSvg
			isLoading={isLoading}
			viewBox={`0 0 ${diameter} ${diameter}`}
			preserveAspectRatio="xMidYMid meet"
		>
			<BubbleChartImages images={images} />
			{
				!isEmpty(bubbleLayoutItems) && !isLoading && (
					<Bubbles
						activeElementId={activeElementId}
						bubbleLayoutItems={bubbleLayoutItems}
						isLoading={isLoading}
						hoveredElement={hoveredElement}
						setHoveredElement={setHoveredElement}
						pinnedElement={pinnedElement}
						setPinnedElement={setPinnedElement}
						images={images}
					/>
				)
			}
		</BubblesSvg>
		<BubblesLoadingContainer isLoading={isLoading}>
			<LoadingIndicator />
		</BubblesLoadingContainer>
		<BubbleChartTooltips
			bubbleLayoutItems={bubbleLayoutItems}
			hoveredElement={hoveredElement}
			pinnedElement={pinnedElement}
			diameter={diameter}
		/>
	</BubbleChartContainer>
);

BubbleChart.propTypes = {
	isLoading: PropTypes.bool,
	diameter: PropTypes.number,
	setHoveredElement: PropTypes.func,
	setPinnedElement: PropTypes.func,
	activeElementId: PropTypes.string,
	bubbleLayoutItems: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string,
			stakeholderFullName: PropTypes.string,
		}),
	),
	images: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			url: PropTypes.string,
		}),
	),
	hoveredElement: PropTypes.oneOfType([
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			itemType: PropTypes.string.isRequired,
		}),
		PropTypes.arrayOf(
			PropTypes.shape({
				id: PropTypes.string.isRequired,
				itemType: PropTypes.string.isRequired,
			}),
		),
	]),
	pinnedElement: PropTypes.oneOfType([
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			itemType: PropTypes.string.isRequired,
		}),
		PropTypes.arrayOf(
			PropTypes.shape({
				id: PropTypes.string.isRequired,
				itemType: PropTypes.string.isRequired,
			}),
		),
	]),
};

BubbleChart.defaultProps = {
	isLoading: false,
	diameter: 100,
	bubbleLayoutItems: [],
	images: [],
	hoveredElement: null,
	pinnedElement: null,
	activeElementId: '',
	setHoveredElement: () => {},
	setPinnedElement: () => {},
};

export default BubbleChart;
