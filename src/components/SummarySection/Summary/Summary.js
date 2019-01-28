import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from '../../Tooltip';
import {
	Item,
	TitleWrapper,
	Title,
	SecondaryInfo,
	ItemDate,
	Type,
	Symbol,
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
		title,
		summary,
	} = item;
	return (
		<Item
			className={getSummaryClass({ hovered, pinned, hoveredElement })}
			id={`summary-${id}`}
			ref={setComponentRef}
			onMouseEnter={() => hoverHandler({ ...item, itemType })}
			onMouseLeave={() => hoverHandler(null)}
			onClick={() => clickHandler({ ...item, itemType })}
		>
			<Tooltip
				id={id}
				itemType={itemType}
				position="left"
				prefetchedData={{ summary, subtitle: '' }}
			>
				<SecondaryInfo variant="h6">
					<Symbol isEvent={itemType === 'event'} />
					<ItemDate>{date}</ItemDate>
					<Type>{type}</Type>
				</SecondaryInfo>
				<TitleWrapper>
					<Title variant="h5">
						{title}
					</Title>
				</TitleWrapper>
			</Tooltip>
		</Item>
	);
};

Summary.propTypes = {
	id: PropTypes.string.isRequired,
	itemType: PropTypes.oneOf(['event', 'document']),
	type: PropTypes.string,
	summary: PropTypes.string,
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
	title: PropTypes.string,
};

Summary.defaultProps = {
	itemType: 'document',
	type: '',
	title: '',
	date: '',
	summary: '',
	hoveredElement: null,
	pinnedElement: null,
	hovered: false,
	pinned: false,
	hoverHandler: () => {},
	clickHandler: () => {},
	setComponentRef: () => {},
};

export default Summary;
