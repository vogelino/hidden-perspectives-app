import React from 'react';
import PropTypes from 'prop-types';
import { isHovered } from '../../../utils/timelineUtil';
import Bubble from '../Bubble';

const Bubbles = ({
	bubbleLayoutItems,
	hoveredElement,
	pinnedElement,
	images,
	setPinnedElement,
	activeElementId,
	...rest
}) => {
	const bubbles = bubbleLayoutItems.reduce((acc, bubbleData) => {
		const hovered = isHovered(bubbleData.data, hoveredElement, 'stakeholder');
		const pinned = isHovered(bubbleData.data, pinnedElement, 'stakeholder');
		const bubble = (
			<Bubble
				key={`bubble-link-${bubbleData.data.name}`}
				hovered={hovered}
				pinned={!hoveredElement && pinned}
				isActive={activeElementId === bubbleData.data.id}
				image={images.find(({ id }) => id === bubbleData.data.id)}
				clickHandler={(pinEl) => {
					if (pinnedElement && pinnedElement.id === pinEl.id) return setPinnedElement(null);
					return setPinnedElement(pinEl);
				}}
				hoveredElement={hoveredElement}
				pinnedElement={pinnedElement}
				{...bubbleData}
				{...rest}
			/>
		);
		if (hovered) {
			acc.hoveredBubbles.push(bubble);
		} else {
			acc.nonHoveredBubbles.push(bubble);
		}
		return acc;
	}, { hoveredBubbles: [], nonHoveredBubbles: [] });

	return (
		<>
			{bubbles.nonHoveredBubbles}
			{bubbles.hoveredBubbles}
		</>
	);
};

Bubbles.propTypes = {
	isLoading: PropTypes.bool,
	diameter: PropTypes.number,
	setHoveredElement: PropTypes.func,
	setPinnedElement: PropTypes.func,
	activeElementId: PropTypes.string,
	bubbleLayoutItems: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string,
			stakeholderFullName: PropTypes.string,
		}),
	),
	images: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			url: PropTypes.string,
		}),
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
};

Bubbles.defaultProps = {
	isLoading: false,
	diameter: 100,
	bubbleLayoutItems: [],
	images: [],
	hoveredElement: null,
	pinnedElement: null,
	activeElementId: '',
	setHoveredElement: () => { },
	setPinnedElement: () => { },
};


export default Bubbles;
