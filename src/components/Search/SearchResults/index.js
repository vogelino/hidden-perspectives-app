import { compose, mapProps } from 'recompose';
import { propEq } from 'ramda';
import SearchResults from './SearchResults';

export default compose(
	mapProps((props) => {
		if (props.activeTab === 'all') return props;
		return {
			...props,
			searchResults: props.searchResults.filter(propEq('type', props.activeTab)),
		};
	}),
)(SearchResults);
