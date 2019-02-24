import { compose, lifecycle } from 'recompose';
import { withApollo } from 'react-apollo';
import { getSearchQuery } from '../Search/utils';
import SearchView from './SearchView';
import { withErrors, getErrorHandler, withLoading } from '../../utils/hocUtil';

const handleSearchResults = console.log;

const performQuery = (props) => {
	props.client.query({
		query: getSearchQuery(),
		variables: { searchQuery: props.query },
	})
		.then(handleSearchResults(props, props.query))
		.catch(getErrorHandler(props, props.query));
};

export default compose(
	withApollo,
	withErrors,
	withLoading,
	lifecycle({
		componentDidMount() {
			performQuery(this.props);
		},
	}),
)(SearchView);
