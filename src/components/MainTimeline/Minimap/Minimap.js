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
	MonthTooltip,
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
			{items.map(({ id, year, density }) => (
				<Month
					key={id}
					density={density}
					height={monthHeight}
					isActive={activeYear === year}
					onClick={() => scrollToYear(year)}
				>
					<MonthTooltip>
						{year}
					</MonthTooltip>
				</Month>
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

const getYears = (items) => items
	.map(({ year }) => year)
	.filter((_, idx) => idx % Math.round(items.length / 5) === 0);

const Minimap = ({
	items,
	isLoading,
	activeYear,
}) => (
	<OuterContainer>
		<InnerContainer>
			<Content>
				<OptimizedMonths items={items} activeYear={activeYear} />
			</Content>
			{!isLoading && <OptimizedDates years={getYears(items)} />}
		</InnerContainer>
	</OuterContainer>
);

Minimap.propTypes = {
	items: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.string.isRequired,
		density: PropTypes.number.isRequired,
	})),
	isLoading: PropTypes.bool,
	activeYear: PropTypes.string,
};

Minimap.defaultProps = {
	isLoading: false,
	items: [],
	activeYear: undefined,
};

export default Minimap;
