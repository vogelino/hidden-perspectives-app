import { withRouter } from 'react-router-dom';
import { compose, lifecycle, withState } from 'recompose';
import PinNotification from './PinNotification';


export default compose(
	withRouter,
	withState('isVisible', 'setIsVisible', false),
	lifecycle({
		componentDidMount() {
			setTimeout(() => this.props.setIsVisible(true), 10);
		},
	}),
)(PinNotification);
