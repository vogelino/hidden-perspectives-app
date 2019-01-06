import React from 'react';
import PropTypes from 'prop-types';
import {
	Container,
	List,
	Title,
	Id,
	ListElement,
	ListTitle,
} from './styles';

const DocumentList = ({ documents }) => (
	<Container>
		<ListTitle>Documents</ListTitle>
		<List>
			{documents.map(({ documentOriginalID, documentTitle }) => (
				<ListElement key={documentOriginalID}>
					<Title>
						<Id>{documentOriginalID}</Id>
						{documentTitle}
					</Title>
				</ListElement>
			))}
		</List>
	</Container>
);

DocumentList.propTypes = {
	documents: PropTypes.arrayOf(PropTypes.shape({
		documentOriginalID: PropTypes.string.isRequired,
		documentTitle: PropTypes.string.isRequired,
	})),
};

DocumentList.defaultProps = {
	documents: [],
};

export default DocumentList;
