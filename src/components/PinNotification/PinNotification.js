import React from 'react';
import PropTypes from 'prop-types';
import {
	Container, Title, IconWrapper, CloseButton,
} from './styles';
import IconItem from '../IconItem';

const PinNotification = ({
	title,
	itemType,
	closeCallback,
}) => (
	<Container>
		<IconWrapper>
			<IconItem
				itemType={itemType}
				isCurrent
				size={18}
			/>
		</IconWrapper>
		<Title>{title}</Title>
		<CloseButton onClick={closeCallback}>✕</CloseButton>
	</Container>
);

PinNotification.propTypes = {
	title: PropTypes.string.isRequired,
	itemType: PropTypes.string.isRequired,
	closeCallback: PropTypes.func,
};

PinNotification.defaultProps = {
	closeCallback: () => null,
};

export default PinNotification;
