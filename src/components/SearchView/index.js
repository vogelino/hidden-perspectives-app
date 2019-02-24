import { compose, lifecycle } from 'recompose';
import { withApollo } from 'react-apollo';
import { getSearchQuery, handleSearchResults, withSearch } from '../Search/utils';
import SearchView from './SearchView';
import { getErrorHandler } from '../../utils/hocUtil';

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
	withSearch,
	lifecycle({
		componentDidMount() {
			performQuery(this.props);

			const {
				onTab,
				onArrow,
				onEnter,
				onEscape,
			} = this.props;

			document.addEventListener('keydown', (evt) => {
				const searhFiledWithFocus = document.querySelector('#search-bar:focus');
				if (searhFiledWithFocus && searhFiledWithFocus.value) return undefined;
				if (evt.code === 'Tab') return onTab(evt);
				if (evt.code === 'Enter') return onEnter(evt);
				if (evt.code === 'Escape') return onEscape(evt);
				if (evt.code === 'ArrowDown' || evt.code === 'ArrowUp') return onArrow(evt);
				return undefined;
			});
		},
		componentDidUpdate(prevProps) {
			if (!this.props.query) return;
			if (prevProps.query === this.props.query) return;
			performQuery(this.props);
		},
	}),
)(SearchView);
