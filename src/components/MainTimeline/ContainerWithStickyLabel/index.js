import { lifecycle } from 'recompose';
import ContainerWithStickyLabel from './ContainerWithStickyLabel';

export default lifecycle({
	shouldComponentUpdate() {
		return false;
	},
})(ContainerWithStickyLabel);
