import {
	compose,
	lifecycle,
	withState,
	withHandlers,
	onlyUpdateForKeys,
} from 'recompose';
import Bubble from './Bubble';

export default compose(
	withState('componentRef', 'setComponentRef', undefined),
	withState('textNodeWidth', 'setTextNodeWidth', undefined),
	withHandlers({
		setTextNodeWidth: ({ setTextNodeWidth, componentRef, textNodeWidth }) => () => {
			if (!componentRef || typeof textNodeWidth !== 'undefined') return;
			const newTextNodeWidth = Math.ceil(componentRef.getBBox().width);
			setTextNodeWidth(newTextNodeWidth);
		},
	}),
	lifecycle({
		componentDidUpdate() {
			this.props.setTextNodeWidth();
		},
	}),
	onlyUpdateForKeys([
		'data',
	]),
)(Bubble);
