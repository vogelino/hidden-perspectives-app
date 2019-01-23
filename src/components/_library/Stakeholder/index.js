import { compose, lifecycle, withState } from 'recompose';
import Stakeholder from './Stakeholder';
import { getWikipediaImagePerUrl } from '../../../utils/imageUtil';

export default compose(
	withState('image', 'setImage', undefined),
	lifecycle({
		componentDidMount() {
			const { setImage, children: name } = this.props;
			getWikipediaImagePerUrl(name).then(setImage);
		},
	}),
)(Stakeholder);
