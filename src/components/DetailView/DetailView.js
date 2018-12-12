import React from 'react';
import PropTypes from 'prop-types';
import LoadingIndicator from '../LoadingIndicator';
import { LoadingContainer } from '../LoadingIndicator/styles';
import { ucFirst } from '../../utils/stringUtil';
import {
	Container,
	Title,
	Subtitle,
	CircleContainer,
	CircleSvg,
	Circle,
	ItemCircle,
	ShowMoreButton,
	ShowMoreButtonContainer,
	Document,
	SingleDocumentPill,
	MultipleDocumentsPill,
	SingleEventPill,
	MultipleEventsPill,
	ConnectionLine,
} from './styles';
import Legend from '../Legend/Legend';

const toRadian = (angle) => angle * (Math.PI / 180);

const DIAMETER_OUTER = 443;
const DIAMETER_INNER = (DIAMETER_OUTER / 100) * 80;
const RADIUS_OUTER = DIAMETER_OUTER / 2;
const RADIUS_INNER = DIAMETER_INNER / 2;
const CIRCLE_CENTER = { cx: RADIUS_OUTER, cy: RADIUS_OUTER };

const getXByAngle = (radius, angle) => (radius * Math.sin(toRadian(angle))) + RADIUS_OUTER;
const getYByAngle = (radius, angle) => (radius * -Math.cos(toRadian(angle))) + RADIUS_OUTER;

const DetailView = ({
	item,
	documents,
	events,
	isLoading,
}) => (
	<Container>
		<LoadingContainer isLoading={isLoading}>
			<LoadingIndicator />
		</LoadingContainer>
		<Legend />
		{item && item.subtitle && <Subtitle>{`${ucFirst(item.itemType)} — ${item.subtitle}`}</Subtitle>}
		{item && <Title>{item.title}</Title>}
		{item && (
			<CircleContainer>
				<CircleSvg
					id="circleContainer"
					viewBox={`0 0 ${DIAMETER_OUTER + 9} ${DIAMETER_OUTER + 9}`}
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
										x1={RADIUS_OUTER}
										y1={RADIUS_OUTER}
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
										x1={RADIUS_OUTER}
										y1={RADIUS_OUTER}
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
			</CircleContainer>
		)}
		{item && (
			<ShowMoreButtonContainer>
				<ShowMoreButton to={`/document/transcript/${item.id}`} variant="light">
					{`Explore ${item.itemType}`}
				</ShowMoreButton>
			</ShowMoreButtonContainer>
		)}
	</Container>
);

DetailView.propTypes = {
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
	isLoading: PropTypes.bool,
};

DetailView.defaultProps = {
	item: undefined,
	isLoading: true,
	documents: [],
	events: [],
};

export default DetailView;
