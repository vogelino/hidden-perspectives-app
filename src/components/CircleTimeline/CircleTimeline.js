import React from 'react';
import PropTypes from 'prop-types';
import { onlyUpdateForKeys } from 'recompose';
import BubbleChart from '../BubbleChart';
import { EventLegend, DocumentLegend } from '../Legend/Legend';
import CentralElement from './CentralElement';
import { isHovered } from '../../utils/timelineUtil';
import { formatHumanDateShort } from '../../utils/dateUtil';
import { withoutReRender } from '../../utils/hocUtil';
import IconItem from '../IconItem';
import PinNotification from '../PinNotification';
import {
	CircleContainer,
	CircleContent,
	CircleSvg,
	Circle,
	Document,
	Symbol,
	DateLabel,
	LegendObject,
	ItemCountIndicator,
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
const LABEL_MARGIN = 15;

const getXByAngle = (radius, angle) => (radius * Math.sin(toRadian(angle)))
	+ RADIUS_OUTER + MARGIN;
const getYByAngle = (radius, angle) => (radius * -Math.cos(toRadian(angle)))
	+ RADIUS_OUTER + MARGIN;

const getDateLabelOrientation = (angle) => {
	let translationValue = { x: 0, y: 0 };
	if (angle === 0) {
		translationValue = { x: -50, y: -100 };
	} else if (angle === 90) {
		translationValue = { x: 0, y: -50 };
	} else if (angle === 180) {
		translationValue = { x: -50, y: 0 };
	} else if (angle === 270) {
		translationValue = { x: 100, y: -50 };
	} else if (angle > 0 && angle < 90) {
		translationValue = { x: 0, y: -50 };
	} else if (angle > 90 && angle < 180) {
		translationValue = { x: 0, y: -50 };
	} else if (angle > 180 && angle < 270) {
		translationValue = { x: -100, y: -50 };
	} else if (angle > 270) {
		translationValue = { x: -100, y: -50 };
	}

	return translationValue;
};

const getDateLabelPosition = (itemX, itemY, radius, angle) => {
	const x = itemX - getXByAngle(radius, angle);
	const y = itemY - getYByAngle(radius, angle);
	const translationValues = getDateLabelOrientation(angle);

	return { x, y, translationValues };
};

const getMaxGroupLength = (documents, events) => {
	const combinedElements = [...documents, ...events];
	let maxGroup = [];
	if (combinedElements.length > 0) {
		maxGroup = combinedElements.reduce((curr, acc) => (
			curr.length > acc.length ? curr : acc
		));
	}

	return maxGroup.length;
};

const filterGroupByTags = (filteredTags, group) => group
	.filter(({ commonTags }) => (commonTags || [])
		.find(({ id }) => (filteredTags || [])
			.find((filterTag) => id === filterTag)));

const isFilteredByTag = (filteredTags, tags) => (
	filteredTags.length > 0
	&& filteredTags.length !== tags.length
);

const getPinNotification = (pinnedElement, setPinnedElement) => {
	const isArray = pinnedElement && pinnedElement.length > 0;
	const itemType = isArray
		? pinnedElement[0].itemType
		: pinnedElement.itemType;
	const title = `Unpin selected ${isArray && pinnedElement.length > 0 ? 'items' : 'item'}`;

	return (
		<PinNotification
			title={title}
			itemType={itemType}
			closeCallback={() => setPinnedElement(null)}
		/>
	);
};

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
	currentElement,
	group,
	itemType,
	onClick,
	events,
	documents,
	onMouseEnter,
	onMouseLeave,
}) => {
	const labelIsActive = angle === 0 || angle === 320;
	const showGroupIndicator = group.length > 1;
	const maxGroupLength = getMaxGroupLength(documents, events);
	const isCurrent = currentElement !== undefined;
	const labelMargin = itemType === 'document'
		? LABEL_MARGIN + RADIUS_OUTER - RADIUS_INNER
		: LABEL_MARGIN;
	const labelRadius = itemType === 'document'
		? RADIUS_INNER + (RADIUS_INNER - RADIUS_OUTER) - LABEL_MARGIN
		: RADIUS_OUTER - LABEL_MARGIN;
	const labelPosition = getDateLabelPosition(
		x,
		y,
		labelRadius,
		angle,
	);

	return (
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
			current={currentElement}
		>
			{
				showGroupIndicator && (
					<ItemCountIndicator
						rotation={angle}
						itemCountScale={group.length / maxGroupLength}
						inner
					/>
				)
			}
			<Symbol
				current={currentElement}
				active={labelIsActive}
				rotation={angle}
				labelMargin={labelMargin}
				itemType={itemType}
			>
				<IconItem
					itemType={itemType}
					isCurrent={isCurrent}
					hovered={hovered}
					pinned={!hoveredElement && pinned}
				/>
			</Symbol>
			<DateLabel
				position={labelPosition}
				active={labelIsActive}
				current={currentElement}
			>
				{formatHumanDateShort(currentElement ? currentElement.date : group[0].date)}
			</DateLabel>
		</Document>
	);
});

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
	const createDocumentMapper = (itemType) => (group) => {
		const filteredGroup = isFilteredByTag(filteredTags, tags)
			? filterGroupByTags(filteredTags, group) : group;
		if (filteredGroup.length === 0) return null;
		const { angle, id: docId } = filteredGroup[0];
		const radius = itemType === 'document' ? RADIUS_INNER : RADIUS_OUTER;
		const currentElement = group.find(({ id }) => id === item.id);
		const hovered = isHovered(group, hoveredElement, itemType);
		const pinned = isHovered(group, pinnedElement, itemType);

		return (
			<TimelineItem
				key={`${itemType}-${docId}`}
				x={getXByAngle(radius, (angle || 0))}
				y={getYByAngle(radius, (angle || 0))}
				docSize={16}
				documents={documents}
				events={events}
				group={group}
				itemType={itemType}
				hovered={hovered}
				pinned={pinned}
				currentElement={currentElement}
				onMouseEnter={() => setHoveredElement(
					filteredGroup.map((groupEl) => ({ ...groupEl, itemType })),
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
						filteredGroup.map((groupEl) => ({ ...groupEl, itemType })),
					);
				}}
				{...{
					angle: angle || 0,
					hoveredElement,
				}}
			/>
		);
	};

	const PinnedElementNotification = pinnedElement && getPinNotification(
		pinnedElement,
		setPinnedElement,
	);

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
					{documents.map(createDocumentMapper('document'))}
					{events.map(createDocumentMapper('event'))}
				</CircleSvg>
				<CentralElement {...item} />
				<BubbleChartContainer>
					<BubbleChart
						items={protagonists}
						diameter={400}
						isLoading={isLoading}
						activeId={item.id}
						hoveredElement={hoveredElement}
						setHoveredElement={setHoveredElement}
						pinnedElement={pinnedElement}
						setPinnedElement={setPinnedElement}
						radialLayout
					/>
				</BubbleChartContainer>
			</CircleContent>
			{PinnedElementNotification}
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

