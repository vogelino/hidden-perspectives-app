import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from '../../Tooltip';
import IconItem from '../../IconItem';
import {
	Item,
	TitleWrapper,
	Title,
	SecondaryInfo,
	ItemDate,
	Type,
	IconContainer,
} from './styles';

const classIf = (className, predicate) => (predicate && className) || '';
const getSummaryClass = ({
	current,
	hoveredElement,
	hovered,
	pinned,
}) => [
	'summary-element',
	classIf('hovered', hovered),
	classIf('current', current),
	classIf('pinned', !hoveredElement && pinned),
].join(' ');

const Summary = ({
	hoveredElement,
	pinnedElement,
	hoverHandler,
	clickHandler,
	setComponentRef,
	item,
	...summmary
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
		thumbnailUrl,
		onBlurCallback,
	} = summmary;

	const current = id === item.id;

	return (
		<Item
			className={getSummaryClass({
				id,
				hovered,
				pinned,
				current,
			})}
			id={`summary-${id}`}
			ref={setComponentRef}
			onMouseEnter={() => hoverHandler({ ...summmary, itemType })}
			onMouseLeave={() => hoverHandler(null)}
			onClick={() => clickHandler({ ...summmary, itemType })}
			onBlur={onBlurCallback}
			tabIndex={0}
		>
			<Tooltip
				id={id}
				itemType={itemType}
				position="left"
				prefetchedData={{
					summary: !current && summary,
					thumbnailUrl: !current && thumbnailUrl,
					subtitle: current ? `You are already on this ${type.toLowerCase()}` : '',
				}}
				withLink={!current}
			>
				<SecondaryInfo variant="h6">
					<IconContainer>
						<IconItem size={20} itemType={itemType} />
					</IconContainer>
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
	item: PropTypes.shape({
		id: PropTypes.string.isRequired,
	}).isRequired,
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
	onBlurCallback: PropTypes.func,
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
	onBlurCallback: () => null,
	setComponentRef: () => {},
};

export default Summary;
