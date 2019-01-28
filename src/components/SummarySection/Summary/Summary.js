import React from 'react';
import PropTypes from 'prop-types';
import {
	Item,
	TitleWrapper,
	Title,
	SecondaryInfo,
	ItemDate,
	Type,
	Symbol,
	SummaryText,
} from './styles';

const classIf = (className, predicate) => (predicate && className) || '';
const getSummaryClass = ({ hoveredElement, hovered, pinned }) => [
	classIf('hovered', hovered),
	classIf('pinned', !hoveredElement && pinned),
].join(' ');

const Summary = ({
	hoveredElement,
	pinnedElement,
	hoverHandler,
	clickHandler,
	setComponentRef,
	...item
}) => {
	const {
		id,
		itemType,
		type,
		hovered,
		pinned,
		date,
		summary,
		title,
	} = item;
	return (
		<Item
			key={id}
			className={getSummaryClass({ hovered, pinned, hoveredElement })}
			id={`summary-${id}`}
			ref={setComponentRef}
		>
			<SecondaryInfo variant="h6">
				<Symbol isEvent={itemType === 'event'} />
				<ItemDate>{date}</ItemDate>
				<Type>{type}</Type>
			</SecondaryInfo>
			<TitleWrapper>
				<Title
					variant="h5"
					onMouseEnter={() => hoverHandler({ ...item, itemType })}
					onMouseLeave={() => hoverHandler(null)}
					onClick={() => clickHandler({ ...item, itemType })}
				>
					{title}
				</Title>
			</TitleWrapper>
			{summary && <SummaryText>{summary}</SummaryText>}
		</Item>
	);
};

Summary.propTypes = {
	id: PropTypes.string.isRequired,
	itemType: PropTypes.oneOf(['event', 'document']),
	type: PropTypes.string,
	hovered: PropTypes.bool,
	pinned: PropTypes.bool,
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
	date: PropTypes.string,
	hoverHandler: PropTypes.func,
	clickHandler: PropTypes.func,
	setComponentRef: PropTypes.func,
	summary: PropTypes.string,
	title: PropTypes.string,
};

Summary.defaultProps = {
	itemType: 'document',
	type: '',
	title: '',
	summary: '',
	date: '',
	hoveredElement: null,
	pinnedElement: null,
	hovered: false,
	pinned: false,
	hoverHandler: () => {},
	clickHandler: () => {},
	setComponentRef: () => {},
};

export default Summary;
