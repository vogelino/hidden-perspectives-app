import {
	compose,
	lifecycle,
	withState,
	withHandlers,
} from 'recompose';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import { withLoading, withErrors, getErrorHandler } from '../../utils/hocUtil';
import { formatGraphcoolDocument, formatGraphcoolEvent } from '../../utils/graphcoolUtil';
import { ucFirst } from '../../utils/stringUtil';
import Tooltip from './Tooltip';

const EVENT_QUERY = gql`
	query GetEvent($id: ID!) {
		Event(id: $id) {
			id
			eventStartDate
			eventTitle
			eventDescription
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
			documentDescription
			documentFiles {
				id
				url
			}
		}
	}
`;

const getDataParser = ({
	itemType,
	setTitle,
	setSubtitle,
	setThumbnailUrl,
	setSummary,
	stopLoading,
}) => ({ data }) => {
	const item = data[ucFirst(itemType)];
	const {
		title,
		type,
		thumbnailUrl,
		summary,
	} = itemType === 'event'
		? formatGraphcoolEvent(item)
		: formatGraphcoolDocument(item);

	setTitle(title);
	setSubtitle(type);
	setThumbnailUrl(thumbnailUrl);
	setSummary(summary);
	stopLoading();
};

export default compose(
	withLoading,
	withErrors,
	withApollo,
	withState('wasHovered', 'setWasHovered', false),
	withState('title', 'setTitle', undefined),
	withState('subtitle', 'setSubtitle', undefined),
	withState('thumbnailUrl', 'setThumbnailUrl', undefined),
	withState('summary', 'setSummary', undefined),
	withHandlers({
		onMouseEnter: ({ setWasHovered }) => () => setWasHovered(true),
	}),
	lifecycle({
		componentDidUpdate(prevProps) {
			const {
				wasHovered,
				client,
				id,
				itemType,
			} = this.props;

			if (!prevProps.wasHovered && wasHovered) {
				client.query({
					query: itemType === 'event' ? EVENT_QUERY : DOCUMENT_QUERY,
					variables: { id },
				})
					.then(getDataParser(this.props))
					.catch(getErrorHandler(this.props));
			}
		},
	}),
)(Tooltip);

