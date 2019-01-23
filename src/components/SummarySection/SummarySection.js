import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { formatHumanDate } from '../../utils/dateUtil';
import { ucFirst } from '../../utils/stringUtil';
import { isHovered } from '../../utils/timelineUtil';
import LoadingIndicator from '../LoadingIndicator';
import {
	Container,
	Items,
	Item,
	TitleWrapper,
	Title,
	SecondaryInfo,
	ItemDate,
	Type,
	Summary,
	Symbol,
	LoadingContainer,
} from './styles';

const SummarySection = ({
	items,
	hoveredElement,
	setHoveredElement,
	isLoading,
}) => (
	<Container>
		<LoadingContainer isLoading={isLoading}>
			<LoadingIndicator />
		</LoadingContainer>
		<Items id="summary-section">
			{items.map((item) => {
				const itemType = item.type === 'Event' ? 'event' : 'document';
				const hovered = isHovered(item, hoveredElement, itemType);
				return (
					<Item
						key={item.id}
						className={hovered && 'hovered'}
						id={`summary-${item.id}`}
					>
						<SecondaryInfo variant="h6">
							<Symbol isEvent={item.type === 'Event'} />
							<ItemDate>{formatHumanDate(item.date)}</ItemDate>
							<Type>{ucFirst(item.type)}</Type>
						</SecondaryInfo>
						<TitleWrapper>
							<Title
								variant="h5"
								onMouseEnter={() => setHoveredElement({ ...item, itemType })}
								onMouseLeave={() => setHoveredElement(null)}
							>
								<NavLink to={`/${itemType}/context/${item.id}`}>
									{item.title}
								</NavLink>
							</Title>
						</TitleWrapper>
						{item.summary && <Summary>{item.summary}</Summary>}
					</Item>
				);
			})}
		</Items>
	</Container>
);

SummarySection.propTypes = {
	items: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		date: PropTypes.instanceOf(Date).isRequired,
		type: PropTypes.string.isRequired,
		summary: PropTypes.string,
	})),
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
	isLoading: PropTypes.bool,
};

SummarySection.defaultProps = {
	items: [],
	hoveredElement: null,
	setHoveredElement: () => { },
	isLoading: true,
};

export default SummarySection;

