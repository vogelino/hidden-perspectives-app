import { compose, lifecycle, withState } from 'recompose';
import Bubble from './Bubble';

export default compose(
	withState('componentRef', 'setComponentRef', undefined),
	withState('textNodeWidth', 'setTextNodeWidth', undefined),
	lifecycle({
		componentDidUpdate() {
			const {
				setTextNodeWidth,
				componentRef,
				textNodeWidth,
			} = this.props;
			if (!componentRef || !!textNodeWidth) return;
			setTextNodeWidth(Math.ceil(componentRef.getBBox().width));
		},
	}),
)(Bubble);
