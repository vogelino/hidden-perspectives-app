import React from 'react';
import PropTypes from 'prop-types';

import {
	Container,
	Title,
	IconWrapper,
	CloseButton,
	ItemLink,
} from './styles';
import IconItem from '../IconItem';

const PinNotification = ({
	title,
	itemType,
	closeCallback,
	path,
	history,
	isVisible,
}) => (
	<Container isVisible={isVisible}>
		<IconWrapper>
			<IconItem
				itemType={itemType}
				size={18}
				pinned
			/>
		</IconWrapper>
		<ItemLink
			onMouseDown={() => {
				closeCallback();
				history.push(path);
			}}
		>
			<Title>
				{title}
			</Title>
		</ItemLink>
		<CloseButton onClick={closeCallback}>✕</CloseButton>
	</Container>
);

PinNotification.propTypes = {
	title: PropTypes.string.isRequired,
	itemType: PropTypes.string.isRequired,
	closeCallback: PropTypes.func,
	path: PropTypes.string,
	isVisible: PropTypes.bool,
	history: PropTypes.objectOf(PropTypes.any).isRequired,
};

PinNotification.defaultProps = {
	closeCallback: () => null,
	path: '',
	isVisible: false,
};

export default PinNotification;
