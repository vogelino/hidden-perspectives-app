import React from 'react';
import PropTypes from 'prop-types';
import { lifecycle } from 'recompose';
import {
	Content,
	InnerContainer,
	OuterContainer,
	YearsContainer,
	Year,
	Date,
	DatesContainer,
	YearTooltip,
} from './styles';

const scrollToYear = (year) => {
	const yearElement = document.getElementById(`timeline-year-${year}`);
	yearElement.scrollIntoView();
};

const OptimizedYears = lifecycle({
	shouldComponentUpdate({ items, activeYear }) {
		return items.length !== this.props.items.length
			|| activeYear !== this.props.activeYear;
	},
})(({ items, activeYear }) => {
	const yearHeight = (100 / items.length);
	return (
		<YearsContainer>
			{items.map(({ id, year, density }) => (
				<Year
					key={id}
					density={density}
					height={yearHeight}
					isActive={activeYear === year}
					onClick={() => scrollToYear(year)}
				>
					<YearTooltip>
						{year}
					</YearTooltip>
				</Year>
			))}
		</YearsContainer>
	);
});

const OptimizedDates = lifecycle({
	shouldComponentUpdate({ years }) {
		return years.length !== this.props.years.length;
	},
})(({ years, items }) => (
	<DatesContainer>
		{years.map((year) => (
			<Date key={year} h={(100 / items.length)}>{year}</Date>
		))}
	</DatesContainer>
));

const getYears = (items) => items
	.map(({ year }) => year);

const Minimap = ({
	items,
	isLoading,
	activeYear,
}) => (
	<OuterContainer>
		<InnerContainer>
			<Content>
				<OptimizedYears items={items} activeYear={activeYear} />
			</Content>
			{!isLoading && (
				<OptimizedDates years={getYears(items)} items={items} />
			)}
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
