import {
	mapProps,
	withState,
	compose,
	onlyUpdateForKeys,
	lifecycle,
} from 'recompose';
import { prop } from 'ramda';
import { getWikipediaImagePerUrl } from '../../utils/imageUtil';
import NodeInfo from './NodeInfo';

const getStakeholderImage = ({ title, id, setImage }) => {
	getWikipediaImagePerUrl(title, id, 200).then(setImage);
};

export default compose(
	mapProps(prop('item')),
	withState('descriptionExpanded', 'toggleDescriptionExpansion', false),
	withState('image', 'setImage', undefined),
	lifecycle({
		componentDidMount() {
			if (this.props.itemType === 'stakeholder') return getStakeholderImage(this.props);
			return undefined;
		},
	}),
	onlyUpdateForKeys([
		'item',
		'image',
		'descriptionExpanded',
		'authors',
	]),
)(NodeInfo);
