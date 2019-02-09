import {
	mapProps,
	withState,
	compose,
	onlyUpdateForPropTypes,
} from 'recompose';
import { prop } from 'ramda';
import NodeInfo from './NodeInfo';

export default compose(
	mapProps(prop('item')),
	withState('descriptionExpanded', 'toggleDescriptionExpansion', false),
	onlyUpdateForPropTypes,
)(NodeInfo);
