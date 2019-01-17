import { compose, withState } from 'recompose';
import Search from './Search';

export default compose(
	withState('searchQuery', 'onSearch', ''),
)(Search);
