import { compose, lifecycle, withState } from 'recompose';
import Stakeholder from './Stakeholder';
import { getWikipediaImage } from '../../../utils/imageUtil';

export default compose(
	withState('image', 'setImage', undefined),
	lifecycle({
		componentDidMount() {
			const { setImage, children: name, id } = this.props;
			getWikipediaImage(name, id, 64).then(setImage);
		},
	}),
)(Stakeholder);
