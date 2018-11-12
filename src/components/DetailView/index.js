import { compose, lifecycle, withState } from 'recompose';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import DetailView from './DetailView';
import { withLoading } from '../../utils/hocUtil';

const EVENT_QUERY = gql`
	query GetEvent($id: ID!) {
		Event(id: $id) {
			id
			eventTitle
		}
	}
`;

const DOCUMENT_QUERY = gql`
	query GetDocument($id: ID!) {
		Document(id: $id) {
			id
			documentTitle
		}
	}
`;

const getItemParser = ({ setItem, stopLoading, itemType }) => ({ data }) => {
	const dataItemName = `${itemType.charAt(0).toUpperCase()}${itemType.slice(1)}`;
	setItem({
		id: data[dataItemName].id,
		title: data[dataItemName][`${itemType}Title`],
	});
	stopLoading();
};

export default compose(
	withApollo,
	withLoading,
	withState('item', 'setItem', undefined),
	lifecycle({
		componentDidMount() {
			const { id, client, itemType } = this.props;
			client.query({
				query: itemType === 'event' ? EVENT_QUERY : DOCUMENT_QUERY,
				variables: { id },
			}).then(getItemParser(this.props));
		},
	}),
)(DetailView);
