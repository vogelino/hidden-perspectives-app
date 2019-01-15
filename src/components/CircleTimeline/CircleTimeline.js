import React from 'react';
import PropTypes from 'prop-types';
import BubbleChart from '../BubbleChart';
import { EventLegend, DocumentLegend } from '../Legend/Legend';
import {
	CircleContainer,
	CircleSvg,
	Circle,
	ItemCircle,
	Document,
	SingleDocumentPill,
	MultipleDocumentsPill,
	SingleEventPill,
	MultipleEventsPill,
	ConnectionLine,
	LegendObject,
	EventLegendContainer,
	DocumentLegendContainer,
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
}) => (
	<CircleContainer>
		<CircleSvg
			id="circleContainer"
			viewBox={`0 0 ${DIAMETER_OUTER + (MARGIN * 2)} ${DIAMETER_OUTER + (MARGIN * 2)}`}
			preserveAspectRatio="xMaxYMax meet"
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
					<EventLegend />
				</EventLegendContainer>
			</LegendObject>
			<LegendObject
				width={RADIUS_OUTER}
				height={22}
				x={0}
				y={RADIUS_OUTER - RADIUS_INNER}
			>
				<DocumentLegendContainer>
					<DocumentLegend />
				</DocumentLegendContainer>
			</LegendObject>
			{documents.map((group) => {
				const { angle, id: docId } = group[0];
				const x = getXByAngle(RADIUS_INNER, angle);
				const y = getYByAngle(RADIUS_INNER, angle);
				const isCurrentElement = group.find(({ id }) => id === item.id);
				const docSize = 18;
				const isStacked = group.length > 1;
				return [
					...(
						isCurrentElement ? [
							<ConnectionLine
								key={`line-${docId}`}
								x1={CIRCLE_CENTER.cx}
								y1={CIRCLE_CENTER.cy}
								x2={x}
								y2={y}
								shapeRendering="crisp-edges"
							/>,
						] : []
					),
					<Document
						x={x - (docSize / 2)}
						y={y - (docSize / 2)}
						width={docSize}
						height={docSize}
						angle={group[0].angle}
						key={`document-${docId}`}
						{...CIRCLE_CENTER}
					>
						{isStacked ? <MultipleDocumentsPill /> : <SingleDocumentPill />}
					</Document>,
				];
			})}
			{events.map((group) => {
				const { angle, id: docId } = group[0];
				const x = getXByAngle(RADIUS_OUTER, angle);
				const y = getYByAngle(RADIUS_OUTER, angle);
				const isCurrentElement = group.find(({ id }) => id === item.id);
				const docSize = 18;
				const isStacked = group.length > 1;
				return [
					...(
						isCurrentElement ? [
							<ConnectionLine
								key={`line-${docId}`}
								x1={CIRCLE_CENTER.cx}
								y1={CIRCLE_CENTER.cy}
								x2={x}
								y2={y}
								shapeRendering="crisp-edges"
							/>,
						] : []
					),
					<Document
						x={x - (docSize / 2)}
						y={y - (docSize / 2)}
						width={docSize}
						height={docSize}
						angle={group[0].angle}
						key={`event-${docId}`}
						{...CIRCLE_CENTER}
					>
						{isStacked
							? <MultipleEventsPill>{group.length}</MultipleEventsPill>
							: <SingleEventPill />}
					</Document>,
				];
			})}
			<ItemCircle
				{...CIRCLE_CENTER}
				r={8}
			/>
		</CircleSvg>
		<BubbleChart
			items={protagonists}
			diameter={300}
			bubblesPadding={5}
			isLoading={isLoading}
		/>
	</CircleContainer>
);

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
};

export default CircleTimeline;

