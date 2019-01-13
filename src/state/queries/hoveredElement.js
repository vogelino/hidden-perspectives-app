import gql from 'graphql-tag';

export const getHoveredElement = gql`
	query getHoveredElement {
		hoveredElement @client {
			id
			itemType
		}
	}
`;

export const setHoveredElement = gql`
	mutation setHoveredElement($id: String, $itemType: String) {
		setHoveredElement(
			id: $id
			itemType: $itemType
		) @client
	}
`;
