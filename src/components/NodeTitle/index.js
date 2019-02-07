import gql from 'graphql-tag';
import {
	compose,
	lifecycle,
	withState,
	withProps,
} from 'recompose';
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

const STAKEHOLDER_QUERY = gql`
	query GetStakholder($id: ID!) {
		Stakeholder(id: $id) {
			id
			stakeholderFullName
		}
	}
`;

const LOCATION_QUERY = gql`
	query GetLocation($id: ID!) {
		Location(id: $id) {
			id
			locationName
		}
	}
`;

const getEventSubtitle = ({ eventStartDate }) => formatHumanDate(eventStartDate);
const getDocumentSubtitle = ({ documentKind }) => ucFirst(documentKind.name);
const getStakeholderSubtitle = () => 'Protagonist';
const getLocationSubtitle = () => 'Location';

const getQueryByItemId = (itemType) => {
	switch (itemType) {
	case 'event': return EVENT_QUERY;
	case 'document': return DOCUMENT_QUERY;
	case 'stakeholder': return STAKEHOLDER_QUERY;
	case 'location': return LOCATION_QUERY;
	default: return '';
	}
};

const getTitleByItemType = (item, itemType) => {
	switch (itemType) {
	case 'event': return item.eventTitle;
	case 'document': return item.documentTitle;
	case 'stakeholder': return item.stakeholderFullName;
	case 'location': return item.locationName;
	default: return '';
	}
};

const getSubtitleByItemType = (item, itemType) => {
	switch (itemType) {
	case 'event': return getEventSubtitle(item);
	case 'document': return getDocumentSubtitle(item);
	case 'stakeholder': return getStakeholderSubtitle(item);
	case 'location': return getLocationSubtitle(item);
	default: return '';
	}
};

const getDataParser = ({ itemType, setTitle, setSubtitle }) => ({ data }) => {
	const dataItemName = ucFirst(itemType);
	const item = data[dataItemName];
	const title = getTitleByItemType(item, itemType);
	const subtitle = getSubtitleByItemType(item, itemType);

	setTitle(title);
	setSubtitle(subtitle);
};

const performQuery = (props) => {
	const { id, client, itemType } = props;
	client.query({
		query: getQueryByItemId(itemType),
		variables: { id },
	}).then(getDataParser(props));
};

export default compose(
	withApollo,
	withState('title', 'setTitle', ''),
	withState('subtitle', 'setSubtitle', ''),
	withProps(({ itemType }) => ({
		symbol: itemType === 'document' ? '▲' : '●',
	})),
	lifecycle({
		componentDidMount() {
			performQuery(this.props);
		},
		shouldComponentUpdate(nextProps) {
			if (this.props.id !== nextProps.id) {
				performQuery(nextProps);
			}
			const { id, title, subtitle } = this.props;
			return (
				id !== nextProps.id
				|| title !== nextProps.title
				|| subtitle !== nextProps.subtitle
			);
		},
	}),
)(NodeTitle);
