import {
	withState,
	compose,
	onlyUpdateForKeys,
	lifecycle,
	withProps,
} from 'recompose';
import { getWikipediaImage } from '../../../utils/imageUtil';
import CentralElement from './CentralElement';
import { formatHumanDateShort } from '../../../utils/dateUtil';

const getStakeholderImage = ({ title, id, setImage }) => {
	getWikipediaImage(title, id, 80).then(setImage);
};

export default compose(
	withState('image', 'setImage', undefined),
	withProps(({ date }) => ({
		formattedDate: formatHumanDateShort(date),
	})),
	lifecycle({
		componentDidMount() {
			if (this.props.itemType === 'stakeholder') return getStakeholderImage(this.props);
			return undefined;
		},
	}),
	onlyUpdateForKeys([
		'itemType',
		'id',
		'date',
		'original',
		'image',
	]),
)(CentralElement);
