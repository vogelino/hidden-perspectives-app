import React from 'react';
import PropTypes from 'prop-types';
import { lifecycle } from 'recompose';
import {
	Content,
	ScrollIndicator,
	Container,
	MonthsContainer,
	Month,
	Date,
	DatesContainer,
} from './styles';

const OptimizedMonths = lifecycle({
	shouldComponentUpdate({ items }) {
		return items.length !== this.props.items.length;
	},
})(({ items }) => {
	const monthHeight = (100 / items.length);
	return (
		<MonthsContainer>
			{items.map(({ id, density }) => (
				<Month key={id} density={density} height={monthHeight} />
			))}
		</MonthsContainer>
	);
});

const OptimizedDates = lifecycle({
	shouldComponentUpdate({ years }) {
		return years.length !== this.props.years.length;
	},
})(({ years }) => (
	<DatesContainer>
		{years.map((year) => <Date key={year}>{year}</Date>)}
	</DatesContainer>
));

const Minimap = ({
	height,
	top,
	items,
	years,
	isLoading,
}) => (
	<Container>
		<Content>
			{!isLoading && <ScrollIndicator height={height} top={top} />}
			<OptimizedMonths items={items} />
		</Content>
		<OptimizedDates years={years} />
	</Container>
);

Minimap.propTypes = {
	height: PropTypes.number,
	top: PropTypes.number,
	items: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.string.isRequired,
		density: PropTypes.number.isRequired,
	})),
	years: PropTypes.arrayOf(PropTypes.string),
	isLoading: PropTypes.bool,
};

Minimap.defaultProps = {
	isLoading: false,
	height: 100,
	top: 0,
	items: [],
	years: [
		'1975',
		'1980',
		'1985',
		'1989',
		'1994',
		'1999',
	],
};

export default Minimap;
