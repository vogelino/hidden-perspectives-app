import React from 'react';
import PropTypes from 'prop-types';
import { onlyUpdateForKeys } from 'recompose';
import BubbleChart from '../BubbleChart';
import { EventLegend, DocumentLegend } from '../Legend/Legend';
import { isHovered } from '../../utils/timelineUtil';
import { withoutReRender } from '../../utils/hocUtil';
import {
	CircleContainer,
	CircleContent,
	CircleSvg,
	Circle,
	Document,
	Symbol,
	LegendObject,
	EventLegendContainer,
	DocumentLegendContainer,
	BubbleChartContainer,
} from './styles';

const toRadian = (angle) => angle * (Math.PI / 180);

const MARGIN = 10;
const DIAMETER_OUTER = 443;
const DIAMETER_INNER = (DIAMETER_OUTER / 100) * 80;
const RADIUS_OUTER = DIAMETER_OUTER / 2;
const RADIUS_INNER = DIAMETER_INNER / 2;
const CIRCLE_CENTER = { cx: RADIUS_OUTER + MARGIN, cy: RADIUS_OUTER + MARGIN };

const getXByAngle = (radius, angle) => (radius * Math.sin(toRadian(angle)))
	+ RADIUS_OUTER + MARGIN;
const getYByAngle = (radius, angle) => (radius * -Math.cos(toRadian(angle)))
	+ RADIUS_OUTER + MARGIN;

const filterGroupByTags = (filteredTags, group) => group
	.filter(({ commonTags }) => (commonTags || [])
		.find(({ id }) => (filteredTags || [])
			.find((filterTag) => id === filterTag)));

const isFilteredByTag = (filteredTags, tags) => (
	filteredTags.length > 0
	&& filteredTags.length !== tags.length
);

const Circles = withoutReRender(() => (
	<>
		<Circle
			missingAngle={toRadian(20)}
			strokeWidth={1}
			shapeRendering="crisp-edges"
			r={RADIUS_OUTER - 1}
			{...CIRCLE_CENTER}
			strokeDasharray={(Math.PI * (DIAMETER_OUTER - 1))}
		/>
		<Circle
			missingAngle={toRadian(20)}
			strokeWidth={1}
			shapeRendering="crisp-edges"
			r={RADIUS_INNER}
			{...CIRCLE_CENTER}
			strokeDasharray={(Math.PI * (DIAMETER_INNER))}
		/>
	</>
));

const Legends = onlyUpdateForKeys([
	'itemCounts',
	'isLoading',
])(({ itemCounts, isLoading }) => (
	<>
		<LegendObject
			width={RADIUS_OUTER}
			height={22}
			x={0}
			y={0}
		>
			<EventLegendContainer>
				<EventLegend
					itemCount={itemCounts.eventsCount}
					isLoading={isLoading}
				/>
			</EventLegendContainer>
		</LegendObject>
		<LegendObject
			width={RADIUS_OUTER}
			height={22}
			x={0}
			y={RADIUS_OUTER - RADIUS_INNER}
		>
			<DocumentLegendContainer>
				<DocumentLegend
					itemCount={itemCounts.documentsCount}
					isLoading={isLoading}
				/>
			</DocumentLegendContainer>
		</LegendObject>
	</>
));

const TimelineItem = onlyUpdateForKeys([
	'hoveredElement',
	'hovered',
	'pinned',
])(({
	x,
	y,
	docSize,
	angle,
	hoveredElement,
	hovered,
	pinned,
	isCurrentElement,
	symbol,
	onClick,
	onMouseEnter,
	onMouseLeave,
}) => (
	<Document
		x={x - (docSize / 2)}
		y={y - (docSize / 2)}
		width={docSize}
		height={docSize}
		angle={angle}
		className={[
			hovered ? 'hovered' : '',
			!hoveredElement && pinned ? 'pinned' : '',
		].join(' ')}
		onMouseEnter={onMouseEnter}
		onMouseLeave={onMouseLeave}
		{...CIRCLE_CENTER}
		onClick={onClick}
		current={isCurrentElement}
	>
		<Symbol>{symbol}</Symbol>
	</Document>
));

const CircleTimeline = ({
	item,
	documents,
	events,
	protagonists,
	isLoading,
	hoveredElement,
	setHoveredElement,
	pinnedElement,
	setPinnedElement,
	itemCounts,
	filteredTags,
	tags,
}) => {
	const createDocumentMapper = (itemType, symbol) => (group) => {
		const filtredGroup = isFilteredByTag(filteredTags, tags)
			? filterGroupByTags(filteredTags, group) : group;
		if (filtredGroup.length === 0) return null;
		const { angle, id: docId } = filtredGroup[0];
		const radius = itemType === 'document' ? RADIUS_INNER : RADIUS_OUTER;
		return (
			<TimelineItem
				key={`${itemType}-${docId}`}
				x={getXByAngle(radius, (angle || 0))}
				y={getYByAngle(radius, (angle || 0))}
				docSize={14}
				hovered={isHovered(filtredGroup, hoveredElement, itemType)}
				pinned={isHovered(filtredGroup, pinnedElement, itemType)}
				isCurrentElement={filtredGroup.find(({ id }) => id === item.id)}
				onMouseEnter={() => setHoveredElement(
					filtredGroup.map((groupEl) => ({ ...groupEl, itemType })),
				)}
				onMouseLeave={() => setHoveredElement(null)}
				onClick={() => {
					if (
						pinnedElement && (
							pinnedElement.id === docId
							|| (Array.isArray(pinnedElement) && pinnedElement.find((el) => el.id === docId))
						)
					) {
						return setPinnedElement(null);
					}
					return setPinnedElement(
						filtredGroup.map((groupEl) => ({ ...groupEl, itemType })),
					);
				}}
				{...{
					angle: angle || 0,
					hoveredElement,
					symbol,
				}}
			/>
		);
	};
	return (
		<CircleContainer>
			<CircleContent>
				<CircleSvg
					id="circleContainer"
					viewBox={`0 0 ${DIAMETER_OUTER + (MARGIN * 2)} ${DIAMETER_OUTER + (MARGIN * 2)}`}
					preserveAspectRatio="xMidYMid meet"
				>
					<Circles />
					<Legends {...{ itemCounts, isLoading }} />
					{documents.map(createDocumentMapper('document', '▲'))}
					{events.map(createDocumentMapper('event', '●'))}
				</CircleSvg>
				<BubbleChartContainer>
					<BubbleChart
						items={protagonists}
						diameter={300}
						bubblesPadding={5}
						isLoading={isLoading}
						activeId={item.id}
						hoveredElement={hoveredElement}
						setHoveredElement={setHoveredElement}
						pinnedElement={pinnedElement}
						setPinnedElement={setPinnedElement}
					/>
				</BubbleChartContainer>
			</CircleContent>
		</CircleContainer>
	);
};

CircleTimeline.propTypes = {
	item: PropTypes.shape({
		title: PropTypes.string.isRequired,
		subtitle: PropTypes.string,
		itemType: PropTypes.string.isRequired,
		id: PropTypes.string.isRequired,
	}),
	documents: PropTypes.arrayOf(
		PropTypes.arrayOf(PropTypes.shape({
			id: PropTypes.string.isRequired,
			angle: PropTypes.number.isRequired,
		})),
	),
	events: PropTypes.arrayOf(
		PropTypes.arrayOf(PropTypes.shape({
			id: PropTypes.string.isRequired,
			angle: PropTypes.number.isRequired,
		})),
	),
	filteredTags: PropTypes.arrayOf(PropTypes.string).isRequired,
	tags: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.string.isRequired,
	})).isRequired,
	protagonists: PropTypes.objectOf(
		PropTypes.arrayOf(PropTypes.shape({
			id: PropTypes.string,
			stakeholderFullName: PropTypes.string,
		})),
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
	setHoveredElement: PropTypes.func,
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
	setPinnedElement: PropTypes.func,
	itemCounts: PropTypes.shape({
		eventsCount: PropTypes.number.isRequired,
		documentsCount: PropTypes.number.isRequired,
	}).isRequired,
	isLoading: PropTypes.bool,
};

CircleTimeline.defaultProps = {
	item: {
		title: 'Title',
		subtitle: 'Subtitle',
		itemType: 'document',
		id: 'woifjiwefopwejpfwe',
	},
	documents: [],
	events: [],
	protagonists: {},
	hoveredElement: null,
	pinnedElement: null,
	setHoveredElement: () => {},
	setPinnedElement: () => {},
	isLoading: true,
};

export default CircleTimeline;

