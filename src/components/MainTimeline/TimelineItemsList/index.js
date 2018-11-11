import { lifecycle } from 'recompose';
import TimelineItemsList from './TimelineItemsList';

export default lifecycle({
	shouldComponentUpdate({ items }) {
		return items.length !== this.props.length;
	},
})(TimelineItemsList);
