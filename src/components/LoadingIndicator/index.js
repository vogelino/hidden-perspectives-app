import { lifecycle } from 'recompose';
import LoadingIndicator from './LoadingIndicator';

export default lifecycle({
	shouldComponentUpdate() {
		return false;
	},
})(LoadingIndicator);
