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
	images,
	...props
}) => bubbleLayoutItems.map((bubbleData) => (
	<Bubble
		key={`bubble-link-${bubbleData.data.name}`}
		hovered={isHovered(bubbleData.data, hoveredElement, 'stakeholder')}
		image={images.find(({ id }) => id === bubbleData.data.id)}
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
	images,
}) => (
	<BubbleChartContainer diameter={diameter}>
		<BubblesSvg
			isLoading={isLoading}
			viewBox={`0 0 ${diameter} ${diameter}`}
			preserveAspectRatio="xMidYMid meet"
		>
			<defs>
				<filter id="image-color-filter">
					<feColorMatrix
						type="matrix"
						values="1 0 0 0 0 1 0 0 0 0 1 0 0 0 0 0 0 0 1 0"
						in="SourceGraphic"
						result="colormatrix"
					/>
					<feComponentTransfer in="colormatrix" result="componentTransfer">
						<feFuncR type="table" tableValues="0.31 0.92" />
						<feFuncG type="table" tableValues="0.31 0.92" />
						<feFuncB type="table" tableValues="0.31 0.92" />
						<feFuncA type="table" tableValues="0 1" />
					</feComponentTransfer>
					<feBlend
						mode="normal"
						in="componentTransfer"
						in2="SourceGraphic"
						result="blend"
					/>
				</filter>
				<filter
					id="image-color-filter-hover"
					x="-10%"
					y="-10%"
					width="120%"
					height="120%"
					filterUnits="objectBoundingBox"
					primitiveUnits="userSpaceOnUse"
					colorInterpolationFilters="sRGB"
				>
					<feColorMatrix
						type="matrix"
						values="1 0 0 0 0 1 0 0 0 0 1 0 0 0 0 0 0 0 1 0"
						in="SourceGraphic"
						result="colormatrix"
					/>
					<feComponentTransfer in="colormatrix" result="componentTransfer">
						<feFuncR type="table" tableValues="0.57 0.99" />
						<feFuncG type="table" tableValues="0.31 0.87" />
						<feFuncB type="table" tableValues="0 0.64" />
						<feFuncA type="table" tableValues="0 1" />
					</feComponentTransfer>
					<feBlend
						mode="normal"
						in="componentTransfer"
						in2="SourceGraphic"
						result="blend"
					/>
				</filter>

				{images.map(({
					id,
					url,
					size,
					x,
					y,
				}) => (
					<pattern
						key={id}
						id={`image-def-${id}`}
						x={x}
						y={y}
						patternUnits="userSpaceOnUse"
						height={size}
						width={size}
					>
						<image
							x="0"
							y="0"
							xlinkHref={url}
							preserveAspectRatio="xMinYMin slice"
							width={size}
							height={size}
						/>
					</pattern>
				))}
			</defs>
			{
				isEmpty(bubbleLayoutItems) && !isLoading
					? <Text x={diameter / 2} y={diameter / 2}>No participants</Text>
					: (
						<Bubbles
							bubbleLayoutItems={bubbleLayoutItems}
							isLoading={isLoading}
							hoveredElement={hoveredElement}
							setHoveredElement={setHoveredElement}
							images={images}
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
};

BubbleChart.defaultProps = {
	isLoading: false,
	diameter: 100,
	bubbleLayoutItems: [],
	images: [],
	hoveredElement: null,
	setHoveredElement: () => {},
};

export default BubbleChart;
