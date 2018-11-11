import {
	compose,
	withState,
	lifecycle,
} from 'recompose';
import Minimap from './Minimap';

const getTimelineElement = () => document.getElementById('mainTimeline');

export default compose(
	withState('height', 'setHeight', 100),
	withState('top', 'setTop', 0),
	lifecycle({
		componentDidMount() {
			const { props } = this;

			let minimapUpdateFrame;
			function minimapUpdater() {
				const container = getTimelineElement();
				if (!container) return;

				const { scrollTop, offsetHeight, scrollHeight } = container;
				props.setHeight((offsetHeight / scrollHeight) * 100);
				props.setTop((scrollTop / scrollHeight) * 100);

				minimapUpdateFrame = window.requestAnimationFrame(minimapUpdater);
			}
			minimapUpdater();

			this.removeMinimapUpdater = () => minimapUpdateFrame
				&& window.cancelAnimationFrame(minimapUpdateFrame);
		},
		componentWillUnmount() {
			this.removeMinimapUpdater();
		},
		shouldComponentUpdate(nextProps) {
			const {
				height,
				top,
				events,
				isLoading,
			} = this.props;
			return (nextProps.height !== height)
				|| (nextProps.top !== top)
				|| (nextProps.events.length !== events.length)
				|| (nextProps.isLoading !== isLoading);
		},
	}),
)(Minimap);
