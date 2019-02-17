import { onlyUpdateForKeys } from 'recompose';
import BubbleChartTooltip from './BubbleChartTooltip';

export default onlyUpdateForKeys([
	'visible',
	'value',
])(BubbleChartTooltip);
