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
	Circle,
	ItemCircle,
	ShowMoreButton,
	ShowMoreButtonContainer,
} from './styles';

const toRadian = (angle) => angle * (Math.PI / 180);

const DIAMETER = 1000;
const RADIUS = 500;
const CENTER = { cx: RADIUS, cy: RADIUS };

const DetailView = ({
	item,
	isLoading,
}) => (
	<Container>
		<LoadingContainer isLoading={isLoading}>
			<LoadingIndicator />
		</LoadingContainer>
		{item && item.subtitle && <Subtitle>{`${ucFirst(item.itemType)} — ${item.subtitle}`}</Subtitle>}
		{item && <Title>{item.title}</Title>}
		{item && (
			<CircleContainer
				id="circleContainer"
				viewBox={`0 0 ${DIAMETER} ${DIAMETER}`}
				preserveAspectRatio="xMidYMid meet"
			>
				<Circle
					missingAngle={toRadian(20)}
					strokeWidth={2}
					shapeRendering="crisp-edges"
					r={RADIUS - 1}
					{...CENTER}
					strokeDasharray={(Math.PI * DIAMETER)}
				/>
				<Circle
					missingAngle={toRadian(20)}
					strokeWidth={2}
					shapeRendering="crisp-edges"
					r={420}
					{...CENTER}
					strokeDasharray={(Math.PI * 860)}
				/>
				<ItemCircle
					{...CENTER}
					r={16}
				/>
			</CircleContainer>
		)}
		{item && (
			<ShowMoreButtonContainer>
				<ShowMoreButton variant="light">
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
	}),
	isLoading: PropTypes.bool,
};

DetailView.defaultProps = {
	item: undefined,
	isLoading: true,
};

export default DetailView;
