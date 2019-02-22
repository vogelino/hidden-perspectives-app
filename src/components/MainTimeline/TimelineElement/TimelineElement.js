import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from '../../Tooltip';
import IconItem from '../../IconItem';
import {
	Container,
	EventTitleContainer,
	EventTitle,
	IconContainer,
} from './styles';

const TimelineElement = ({
	itemType,
	id,
	hovered,
	path,
	title,
	hoverHandler,
	clickHandler,
	...itemProps
}) => (
	<Container>
		<EventTitleContainer
			className={[
				'timeline-event',
				hovered ? 'hovered' : '',
			].join(' ')}
			data-id={id}
			right={itemType === 'document'}
			onMouseEnter={() => hoverHandler({ id, itemType, ...itemProps })}
			onMouseLeave={() => hoverHandler(null)}
			onClick={() => clickHandler({ id, itemType, ...itemProps })}
			tabIndex={0}
		>
			<IconContainer>
				<IconItem itemType={itemType} hovered={hovered} size={18} />
			</IconContainer>
			<Tooltip
				id={id}
				itemType={itemType}
				position={itemType === 'document' ? 'right' : 'left'}
			>
				<EventTitle>
					{title}
				</EventTitle>
			</Tooltip>
		</EventTitleContainer>
	</Container>
);

TimelineElement.propTypes = {
	itemType: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	path: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	hoverHandler: PropTypes.func.isRequired,
	clickHandler: PropTypes.func.isRequired,
	hovered: PropTypes.bool.isRequired,
};

export default TimelineElement;
