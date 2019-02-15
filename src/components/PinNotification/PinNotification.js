import React from 'react';
import PropTypes from 'prop-types';
import {
	Container, Title, IconWrapper, CloseButton,
} from './styles';
import IconItem from '../IconItem';
import { getShortenedString } from '../../utils/stringUtil';

const NOTIFICATION_MAX_LEN = 70;
const PinNotification = ({
	title,
	itemType,
	closeCallback,
	alignRight,
}) => (
	<Container alignRight={alignRight}>
		<IconWrapper>
			<IconItem
				itemType={itemType}
				isCurrent
				size={18}
			/>
		</IconWrapper>
		<Title>{getShortenedString(title, NOTIFICATION_MAX_LEN)}</Title>
		<CloseButton onClick={closeCallback}>✕</CloseButton>
	</Container>
);

PinNotification.propTypes = {
	title: PropTypes.string.isRequired,
	itemType: PropTypes.string.isRequired,
	closeCallback: PropTypes.func,
	alignRight: PropTypes.bool,
};

PinNotification.defaultProps = {
	closeCallback: () => null,
	alignRight: false,
};

export default PinNotification;
