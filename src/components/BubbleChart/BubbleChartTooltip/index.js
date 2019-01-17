import {
	compose,
	lifecycle,
} from 'recompose';
import BubbleChartTooltip from './BubbleChartTooltip';

export default compose(
	lifecycle({
		componentDidMount() {
			console.log(this.props);
		},
	}),
)(BubbleChartTooltip);
