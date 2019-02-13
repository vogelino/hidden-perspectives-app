import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'ramda';
import { isHovered } from '../../utils/timelineUtil';
import {
	BubbleChartContainer,
	BubblesSvg,
	BubblesLoadingContainer,
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
	const toRelativePosition = (pos) => pos * 100 / diameter;

	return (
		<BubbleChartTooltip
			key={`tooltip-${name}`}
			visible={hoveredElement && hoveredElement.id === data.id}
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
	pinnedElement,
	images,
	setPinnedElement,
	activeElementId,
	...props
}) => bubbleLayoutItems.map((bubbleData) => {
	const hovered = isHovered(bubbleData.data, hoveredElement, 'stakeholder');
	const pinned = isHovered(bubbleData.data, pinnedElement, 'stakeholder');
	return (
		<Bubble
			key={`bubble-link-${bubbleData.data.name}`}
			hovered={hovered}
			pinned={!hoveredElement && pinned}
			isActive={activeElementId === bubbleData.data.id}
			image={images.find(({ id }) => id === bubbleData.data.id)}
			clickHandler={(pinEl) => {
				if (pinnedElement && pinnedElement.id === pinEl.id) return setPinnedElement(null);
				return setPinnedElement(pinEl);
			}}
			{...bubbleData}
			{...props}
		/>
	);
});

const GradientMapFilter = ({
	id,
	red,
	green,
	blue,
}) => (
	<filter id={id}>
		<feColorMatrix
			type="matrix"
			values="1 0 0 0 0 1 0 0 0 0 1 0 0 0 0 0 0 0 1 0"
			in="SourceGraphic"
			result="colormatrix"
		/>
		<feComponentTransfer in="colormatrix" result="componentTransfer">
			<feFuncR type="table" tableValues={red} />
			<feFuncG type="table" tableValues={green} />
			<feFuncB type="table" tableValues={blue} />
			<feFuncA type="table" tableValues="0 1" />
		</feComponentTransfer>
		<feBlend
			mode="normal"
			in="componentTransfer"
			in2="SourceGraphic"
			result="blend"
		/>
	</filter>
);

GradientMapFilter.propTypes = {
	id: PropTypes.string.isRequired,
	red: PropTypes.string.isRequired,
	green: PropTypes.string.isRequired,
	blue: PropTypes.string.isRequired,
};

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
			<defs>
				<GradientMapFilter
					id="image-color-filter"
					red="0.3 0.87"
					green="0.34 0.89"
					blue="0.38 0.9"
				/>
				<GradientMapFilter
					id="image-color-filter-hover"
					red="0.39 0.8 1"
					green="0.15 0.57 0.93"
					blue="0.06 0.33 0.78"
				/>

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
		<Tooltips
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
