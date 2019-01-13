import { compose, lifecycle } from 'recompose';
import { withHoveredElement, withHoveredElementSetter } from '../../../utils/hocUtil';
import TimelineElement from './TimelineElement';

const isHovered = (item, hoveredElement) => Boolean(
	hoveredElement && (item.id === hoveredElement.id),
);

export default compose(
	withHoveredElement(({ hoveredElement, ...item }) => ({
		...item,
		hovered: isHovered(item, hoveredElement),
	})),
	withHoveredElementSetter(({ setHoveredElement, ...item }) => ({
		...item,
		hoverHandler: setHoveredElement,
	})),
	lifecycle({
		shouldComponentUpdate(nextProps) {
			return this.props.hovered !== nextProps.hovered;
		},
	}),
)(TimelineElement);
