import React from 'react';
import PropTypes from 'prop-types';
import {
	BubbleChartContainer,
	BubblesSvg,
	BubblesLoadingContainer,
} from './styles';
import BubbleChartImages from './BubbleChartImages';
import Bubbles from './Bubbles';
import LoadingIndicator from '../LoadingIndicator';

const BubbleChart = (props) => (
	<BubbleChartContainer {...props}>
		<BubblesSvg
			{...props}
			viewBox={`0 0 ${props.diameter} ${props.diameter}`}
		>
			<BubbleChartImages {...props} />
			{props.bubbleLayoutItems.length && !props.isLoading && <Bubbles {...props} />}
		</BubblesSvg>
		<BubblesLoadingContainer {...props}><LoadingIndicator /></BubblesLoadingContainer>
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
