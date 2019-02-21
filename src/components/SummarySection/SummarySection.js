import React from 'react';
import PropTypes from 'prop-types';
import { formatHumanDate } from '../../utils/dateUtil';
import { ucFirst } from '../../utils/stringUtil';
import { isHovered } from '../../utils/timelineUtil';
import Summary from './Summary';
import { Items } from './styles';

const SummarySection = ({
	items,
	setPinnedElement,
	setHoveredElement,
	...props
}) => (
	<Items id="summary-section" className="tour-related-entries-list">
		{items.map((item) => {
			const itemType = item.type === 'Event' ? 'event' : 'document';
			const { hoveredElement, pinnedElement } = props;
			return (
				<Summary
					key={item.id}
					{...props}
					{...item}
					type={ucFirst(item.type)}
					date={formatHumanDate(item.date)}
					itemType={itemType}
					hovered={isHovered(item, hoveredElement, itemType)}
					pinned={!hoveredElement && isHovered(item, pinnedElement, itemType)}
					hoverHandler={setHoveredElement}
					clickHandler={(pinEl) => {
						const { id } = pinEl;
						if (
							pinnedElement && (
								pinnedElement.id === id
								|| (Array.isArray(pinnedElement)
									&& pinnedElement.find((el) => el.id === id))
							)
						) {
							return setPinnedElement(null);
						}
						return setPinnedElement({ ...item, itemType });
					}}
					onBlurCallback={() => setPinnedElement(null)}
				/>
			);
		})}
	</Items>
);

SummarySection.propTypes = {
	items: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		date: PropTypes.instanceOf(Date).isRequired,
		type: PropTypes.string.isRequired,
		summary: PropTypes.string,
	})),
	setHoveredElement: PropTypes.func,
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
	setPinnedElement: PropTypes.func,
	isLoading: PropTypes.bool,
};

SummarySection.defaultProps = {
	items: [],
	hoveredElement: null,
	setHoveredElement: () => { },
	pinnedElement: null,
	setPinnedElement: () => { },
	isLoading: true,
};

export default SummarySection;

