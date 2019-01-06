import React from 'react';
import PropTypes from 'prop-types';
import { formatHumanDate } from '../../utils/dateUtil';
import { ucFirst } from '../../utils/stringUtil';
import {
	Container,
	Items,
	Item,
	Title,
	SecondaryInfo,
	ItemDate,
	Type,
	Summary,
} from './styles';

const SummarySection = ({ items }) => (
	<Container>
		<Items>
			{items.map((item) => (
				<Item key={item.id}>
					<SecondaryInfo variant="h6">
						<ItemDate>{formatHumanDate(item.date)}</ItemDate>
						<Type>{ucFirst(item.type)}</Type>
					</SecondaryInfo>
					<Title variant="h5">{item.title}</Title>
					{item.summary && <Summary>{item.summary}</Summary>}
				</Item>
			))}
		</Items>
	</Container>
);

SummarySection.propTypes = {
	items: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		date: PropTypes.instanceOf(Date).isRequired,
		type: PropTypes.string.isRequired,
		summary: PropTypes.string,
	})),
};

SummarySection.defaultProps = {
	items: [],
};

export default SummarySection;

