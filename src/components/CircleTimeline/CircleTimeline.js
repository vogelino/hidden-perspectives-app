import React from 'react';
import PropTypes from 'prop-types';
import BubbleChart from '../BubbleChart';
import { EventLegend, DocumentLegend } from '../Legend/Legend';
import { isHovered } from '../../utils/timelineUtil';
import {
	CircleContainer,
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
}) => {
	const createDocumentMapper = (itemType, symbol) => (group) => {
		const { angle, id: docId } = group[0];
		const radius = itemType === 'document' ? RADIUS_INNER : RADIUS_OUTER;
		const x = getXByAngle(radius, angle);
		const y = getYByAngle(radius, angle);
		const isCurrentElement = group.find(({ id }) => id === item.id);
		const docSize = 14;
		const hovered = isHovered(group, hoveredElement, itemType);
		const pinned = isHovered(group, pinnedElement, itemType);
		const groupWithItemType = group.map((groupEl) => ({ ...groupEl, itemType }));
		return (
			<Document
				x={x - (docSize / 2)}
				y={y - (docSize / 2)}
				width={docSize}
				height={docSize}
				angle={group[0].angle}
				key={`${itemType}-${docId}`}
				className={[
					hovered ? 'hovered' : '',
					!hoveredElement && pinned ? 'pinned' : '',
				].join(' ')}
				onMouseEnter={() => setHoveredElement(groupWithItemType)}
				onMouseLeave={() => setHoveredElement(null)}
				{...CIRCLE_CENTER}
				onClick={() => {
					if (
						pinnedElement && (
							pinnedElement.id === docId
							|| (Array.isArray(pinnedElement) && pinnedElement.find((el) => el.id === docId))
						)
					) {
						return setPinnedElement(null);
					}
					return setPinnedElement(groupWithItemType);
				}}
				current={isCurrentElement}
			>
				<Symbol>{symbol}</Symbol>
			</Document>
		);
	};
	return (
		<CircleContainer>
			<CircleSvg
				id="circleContainer"
				viewBox={`0 0 ${DIAMETER_OUTER + (MARGIN * 2)} ${DIAMETER_OUTER + (MARGIN * 2)}`}
				preserveAspectRatio="xMidYMid meet"
			>
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
				{documents.map(createDocumentMapper('document', '▲'))}
				{events.map(createDocumentMapper('event', '●'))}
			</CircleSvg>
			<BubbleChartContainer>
				<BubbleChart
					items={protagonists}
					diameter={400}
					bubblesPadding={5}
					isLoading={isLoading}
					activeId={item.id}
					hoveredElement={hoveredElement}
					setHoveredElement={setHoveredElement}
					pinnedElement={pinnedElement}
					setPinnedElement={setPinnedElement}
					radialLayout
				/>
			</BubbleChartContainer>
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
};

export default CircleTimeline;

