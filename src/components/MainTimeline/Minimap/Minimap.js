import React from 'react';
import PropTypes from 'prop-types';
import { lifecycle } from 'recompose';
import {
	Content,
	InnerContainer,
	OuterContainer,
	MonthsContainer,
	Month,
	Date,
	DatesContainer,
} from './styles';

const scrollToYear = (year) => {
	const yearElement = document.getElementById(`timeline-year-${year}`);
	yearElement.scrollIntoView();
};

const OptimizedMonths = lifecycle({
	shouldComponentUpdate({ items, activeYear }) {
		return items.length !== this.props.items.length
			|| activeYear !== this.props.activeYear;
	},
})(({ items, activeYear }) => {
	const monthHeight = (100 / items.length);
	return (
		<MonthsContainer>
			{items.map(({ id, density }) => {
				const [year] = id.split('-');
				return (
					<Month
						key={id}
						density={density}
						height={monthHeight}
						isActive={activeYear === year}
						onClick={() => scrollToYear(year)}
					/>
				);
			})}
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
	items,
	years,
	isLoading,
	activeYear,
}) => (
	<OuterContainer>
		<InnerContainer>
			<Content>
				<OptimizedMonths items={items} activeYear={activeYear} />
			</Content>
			{!isLoading && <OptimizedDates years={years} />}
		</InnerContainer>
	</OuterContainer>
);

Minimap.propTypes = {
	items: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.string.isRequired,
		density: PropTypes.number.isRequired,
	})),
	years: PropTypes.arrayOf(PropTypes.string),
	isLoading: PropTypes.bool,
	activeYear: PropTypes.string,
};

Minimap.defaultProps = {
	isLoading: false,
	items: [],
	years: [
		'1975',
		'1980',
		'1985',
		'1989',
		'1994',
		'1999',
	],
	activeYear: undefined,
};

export default Minimap;
