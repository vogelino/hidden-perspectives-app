import {
	compose,
	lifecycle,
	withState,
	onlyUpdateForKeys,
} from 'recompose';
import gql from 'graphql-tag';
import { withApollo } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import { getShortenedString, ucFirst } from '../../utils/stringUtil';
import HistoryBreadcrumb from './HistoryBreadcrumb';


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

const getQueryByItemType = (itemType) => {
	switch (itemType) {
	case 'protagonist': return STAKEHOLDER_QUERY;
	case 'event': return EVENT_QUERY;
	case 'document': return DOCUMENT_QUERY;
	case 'location': return LOCATION_QUERY;
	default: return undefined;
	}
};

const getTitleFromResponse = ({ data }, itemType) => {
	switch (itemType) {
	case 'protagonist': return data.Stakeholder.stakeholderFullName;
	case 'event': return data.Event.eventTitle;
	case 'document': return data.Document.documentTitle;
	case 'location': return data.Location.locationName;
	default: return undefined;
	}
};

const getAdditionalInfo = async (pathname, client) => {
	if (pathname === '/') return { title: 'Vertical timeline' };
	if (pathname.startsWith('/search/')) {
		const searchQuery = decodeURIComponent(pathname.replace('/search/', ''));
		return { title: `Search for "${searchQuery}"` };
	}
	const [, itemType, pageName, id] = pathname.split('/');
	const titleReq = await client.query({
		query: getQueryByItemType(itemType),
		variables: { id },
	});
	const title = getTitleFromResponse(titleReq, itemType);
	const normalizedItemType = itemType === 'protagonist' ? 'stakeholder' : itemType;
	return {
		title: `${getShortenedString(title, 25)} (${ucFirst(pageName)})`,
		fullTitle: title,
		itemType: normalizedItemType,
		id,
		icon: {
			itemType: normalizedItemType,
		},
	};
};

const addPage = async ({
	setPages,
	pages,
	history,
	client,
}, { pathname }) => {
	if (pathname.startsWith('/unsupported-browser')) return;
	if (pathname.startsWith('/login')) return;
	const additionalInfo = await getAdditionalInfo(pathname, client);
	setPages([
		{
			url: pathname,
			...additionalInfo,
			onClick: () => history.push(pathname),
		},
		...pages.filter(({ url }) => url !== pathname),
	]);
};

export default compose(
	withRouter,
	withApollo,
	withState('pages', 'setPages', []),
	withState('currentPageUrl', 'setCurrentPageUrl', ''),
	lifecycle({
		componentDidMount() {
			this.unlisten = this.props.history.listen((location, action) => {
				if (action !== 'PUSH') return;
				this.props.setCurrentPageUrl(location.pathname);
				addPage(this.props, location);
			});
			addPage(this.props, this.props.history.location);
			this.props.setCurrentPageUrl(this.props.history.location.pathname);
		},
		componentWillUnmount() {
			this.unlisten();
		},
	}),
	onlyUpdateForKeys([
		'pages',
		'currentPageUrl',
	]),
)(HistoryBreadcrumb);
