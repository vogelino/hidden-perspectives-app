import { withTheme } from 'styled-components';
import { compose, onlyUpdateForKeys } from 'recompose';
import IconItem from './IconItem';

export default compose(
	withTheme,
	onlyUpdateForKeys([
		'itemType',
		'isCurrent',
		'hovered',
	]),
)(IconItem);
