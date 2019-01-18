import {
	compose,
	withState,
	lifecycle,
} from 'recompose';
import { isPartlyInViewport } from '../../../utils/timelineUtil';
import Minimap from './Minimap';

const getTimelineElement = () => document.getElementById('mainTimeline');

export default compose(
	withState('activeYear', 'setActiveYear', undefined),
	lifecycle({
		componentDidMount() {
			const { props } = this;
			let minimapUpdateFrame;
			function minimapUpdater() {
				const container = getTimelineElement();
				if (container) {
					const yearElements = [...container.getElementsByClassName('timeline-year')];
					const visibleYear = yearElements.find(isPartlyInViewport);
					if (visibleYear) {
						const year = visibleYear.getAttribute('data-value');
						if (props.activeYear !== year) {
							props.setActiveYear(year);
						}
					}
				}
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
				activeYear,
				items,
				isLoading,
			} = this.props;
			return (nextProps.activeYear !== activeYear)
				|| (nextProps.items.length !== items.length)
				|| (nextProps.isLoading !== isLoading);
		},
	}),
)(Minimap);
