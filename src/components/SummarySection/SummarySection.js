import React from 'react';
import PropTypes from 'prop-types';
import { formatHumanDate } from '../../utils/dateUtil';
import { ucFirst } from '../../utils/stringUtil';
import { isHovered } from '../../utils/timelineUtil';
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
} from './styles';

const SummarySection = ({
	items,
	hoveredElement,
	setHoveredElement,
}) => (
	<Container>
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
								{item.title}
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
};

SummarySection.defaultProps = {
	items: [],
	hoveredElement: null,
	setHoveredElement: () => { },
};

export default SummarySection;

