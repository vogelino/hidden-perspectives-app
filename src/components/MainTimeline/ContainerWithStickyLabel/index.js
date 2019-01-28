import { renderOnlyIfInViewport } from '../../../utils/hocUtil';
import ContainerWithStickyLabel from './ContainerWithStickyLabel';

export default renderOnlyIfInViewport(
	(props, nextProps) => (
		props.hoveredElement !== nextProps.hoveredElement
		|| props.pinnedElement !== nextProps.pinnedElement
	),
)(ContainerWithStickyLabel);
