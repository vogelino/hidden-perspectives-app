import { compose, lifecycle, withState } from 'recompose';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import DetailView from './DetailView';
import { withLoading } from '../../utils/hocUtil';
import { ucFirst } from '../../utils/stringUtil';
import { getFormattedDate } from '../../utils/dateUtil';

const EVENT_QUERY = gql`
	query GetEvent($id: ID!) {
		Event(id: $id) {
			id
			eventTitle
			eventStartDate
		}
	}
`;

const DOCUMENT_QUERY = gql`
	query GetDocument($id: ID!) {
		Document(id: $id) {
			id
			documentTitle
			documentKind {
				name
			}
		}
	}
`;

const getItemParser = ({ setItem, stopLoading, itemType }) => ({ data }) => {
	const dataItemName = ucFirst(itemType);
	const item = data[dataItemName];
	setItem({
		id: item.id,
		title: item[`${itemType}Title`],
		subtitle: itemType === 'document'
			? item.documentKind.name : getFormattedDate(new Date(item.eventStartDate)),
		itemType,
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
