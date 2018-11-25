import { lifecycle } from 'recompose';
import Legend from './Legend';

export default lifecycle({
	shouldComponentUpdate() {
		return false;
	},
})(Legend);
