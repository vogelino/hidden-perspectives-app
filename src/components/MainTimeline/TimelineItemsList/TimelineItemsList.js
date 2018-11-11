import React from 'react';
import PropTypes from 'prop-types';

const TimelineItemsList = ({
	items,
	ContainerComponent,
	SinglePillComponent,
	MultiplePillsComponent,
	DateComponent,
	TitleContainerComponent,
	TitleComponent,
}) => items.map((group) => {
	const {
		id,
		title,
		yPosition,
		date,
	} = group[0];
	return (
		<ContainerComponent style={{ top: `${yPosition}px` }} key={id}>
			{group.length > 1
				? <MultiplePillsComponent>{group.length}</MultiplePillsComponent>
				: <SinglePillComponent />
			}
			<DateComponent>{date}</DateComponent>
			<TitleContainerComponent>
				<TitleComponent>{title.trim() || 'Untitled'}</TitleComponent>
			</TitleContainerComponent>
		</ContainerComponent>
	);
});

TimelineItemsList.propTypes = {
	items: PropTypes.arrayOf(PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			title: PropTypes.string.isRequired,
			yPosition: PropTypes.number.isRequired,
			date: PropTypes.string.isRequired,
		}),
	)),
	ContainerComponent: PropTypes.shape({}).isRequired,
	SinglePillComponent: PropTypes.shape({}).isRequired,
	MultiplePillsComponent: PropTypes.shape({}).isRequired,
	DateComponent: PropTypes.shape({}).isRequired,
	TitleContainerComponent: PropTypes.shape({}).isRequired,
	TitleComponent: PropTypes.shape({}).isRequired,
};

TimelineItemsList.defaultProps = {
	items: [],
};

export default TimelineItemsList;
