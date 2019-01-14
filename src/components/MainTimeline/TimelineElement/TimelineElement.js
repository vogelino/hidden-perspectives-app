import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from '../../Tooltip';
import {
	EventTitleContainer,
	EventTitle,
} from './styles';

const TimelineElement = ({
	itemType,
	id,
	hovered,
	path,
	title,
	hoverHandler,
	...itemProps
}) => (
	<EventTitleContainer
		className="timeline-event"
		data-id={id}
		right={itemType === 'document'}
		onMouseEnter={() => hoverHandler({ id, itemType, ...itemProps })}
		onMouseLeave={() => hoverHandler(null)}
	>
		<Tooltip id={id} itemType={itemType} position={itemType === 'document' ? 'right' : 'left'}>
			<EventTitle
				to={path}
				className={hovered ? 'hovered' : ''}
			>
				{title}
			</EventTitle>
		</Tooltip>
	</EventTitleContainer>
);

TimelineElement.propTypes = {
	itemType: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	path: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	hoverHandler: PropTypes.func.isRequired,
	hovered: PropTypes.bool.isRequired,
};

export default TimelineElement;
