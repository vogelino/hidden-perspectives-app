import gql from 'graphql-tag';
import { compose, lifecycle, withState } from 'recompose';
import { withApollo } from 'react-apollo';
import { ucFirst } from '../../utils/stringUtil';
import { formatHumanDate } from '../../utils/dateUtil';
import NodeTitle from './NodeTitle';

const EVENT_QUERY = gql`
	query GetEvent($id: ID!) {
		Event(id: $id) {
			id
			eventStartDate
			eventTitle
		}
	}
`;

const DOCUMENT_QUERY = gql`
	query GetDocument($id: ID!) {
		Document(id: $id) {
			id
			documentTitle
			documentKind {
				id
				name
			}
		}
	}
`;

const getEventSubtitle = ({ eventStartDate }) => formatHumanDate(eventStartDate);
const getDocumentSubtitle = ({ documentKind }) => ucFirst(documentKind.name);

const getDataParser = ({ itemType, setTitle, setSubtitle }) => ({ data }) => {
	const dataItemName = ucFirst(itemType);
	const item = data[dataItemName];
	const title = item[`${itemType}Title`];
	const subtitle = itemType === 'event'
		? getEventSubtitle(item)
		: getDocumentSubtitle(item);

	setTitle(title);
	setSubtitle(subtitle);
};

export default compose(
	withApollo,
	withState('title', 'setTitle', ''),
	withState('subtitle', 'setSubtitle', ''),
	lifecycle({
		componentDidMount() {
			const { id, client, itemType } = this.props;
			client.query({
				query: itemType === 'event' ? EVENT_QUERY : DOCUMENT_QUERY,
				variables: { id },
			}).then(getDataParser(this.props));
		},
	}),
)(NodeTitle);
