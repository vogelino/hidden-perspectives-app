import React from 'react';
import PropTypes from 'prop-types';
import {
	Container,
	Text,
	Link,
} from './styles';

const RawItem = ({ children }) => (
	<Container>
		<Text>{children}</Text>
	</Container>
);

const Item = ({ children, itemType, to }) => (to ? (
	<Link to={to}>
		<Container itemType={itemType}>
			<Text>{children}</Text>
		</Container>
	</Link>
) : (
	<Container itemType={itemType}>
		<Text>{children}</Text>
	</Container>
));

Item.propTypes = {
	children: PropTypes.string.isRequired,
	itemType: PropTypes.string.isRequired,
	to: PropTypes.string,
};

Item.defaultProps = {
	to: undefined,
};

RawItem.propTypes = Item.propTypes;
RawItem.defaultProps = Item.defaultProps;

export default Item;
