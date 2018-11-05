import React from 'react';
import PropTypes from 'prop-types';
import OutsideClickHandler from 'react-outside-click-handler';
import { compose, withHandlers, withState } from 'recompose';
import TextInput from '../TextInput';
import {
	DayPicker,
	Container,
} from './styles';

const ensureTwoDigits = (digit) => (`0${digit}`).slice(-2);

const getFormattedDate = (date) => {
	const year = date.getFullYear();
	const month = ensureTwoDigits(date.getMonth() + 1);
	const day = ensureTwoDigits(date.getDate());
	return `${year}-${month}-${day}`;
};

const DatePicker = ({
	isFocused,
	setIsFocused,
	value,
	onDaySelect,
	onChange,
	...rest
}) => (
	<OutsideClickHandler onOutsideClick={() => setIsFocused(false)}>
		<Container>
			<TextInput
				{...rest}
				onFocus={() => setIsFocused(true)}
				value={value}
				onChange={(evt) => onChange(evt.target.value)}
				type="date"
			/>
			{isFocused && (
				<DayPicker
					onDayClick={onDaySelect}
					selectedDays={new Date(value)}
					onBlur={() => setIsFocused(false)}
				/>
			)}
		</Container>
	</OutsideClickHandler>
);

DatePicker.propTypes = {
	isFocused: PropTypes.bool,
	setIsFocused: PropTypes.func,
	value: PropTypes.string,
	onChange: PropTypes.func,
	onDaySelect: PropTypes.func,
};

DatePicker.defaultProps = {
	isFocused: false,
	setIsFocused: () => {},
	onDaySelect: () => {},
	onChange: () => {},
	value: undefined,
};

export default compose(
	withState('isFocused', 'setIsFocused', false),
	withHandlers({
		onDaySelect: ({ setIsFocused, onChange }) => (dayDate) => {
			const formattedDate = getFormattedDate(dayDate);
			onChange(formattedDate);
			setIsFocused(false);
		},
	}),
)(DatePicker);

