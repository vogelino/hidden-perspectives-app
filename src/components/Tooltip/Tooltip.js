import React from 'react';
import PropTypes from 'prop-types';
import {
	ifElse,
	identity,
	pipe,
	length,
	lt,
	join,
	append,
	head,
	splitAt,
} from 'ramda';
import {
	Trigger,
	Container,
	Thumbnail,
	Title,
	Subtitle,
	Summary,
} from './styles';

const SUMMARY_MAX_LEN = 200;
const isBiggerThanMax = pipe(length, lt(SUMMARY_MAX_LEN));
const shortenToMax = pipe(
	splitAt(SUMMARY_MAX_LEN),
	head,
	append('…'),
	join(''),
);
const getSummary = ifElse(isBiggerThanMax, shortenToMax, identity);

const Tooltip = ({
	id,
	title,
	subtitle,
	summary,
	thumbnailUrl,
	isLoading,
	position,
}) => (
	<Container id={`tooltip-${id}`} position={position}>
		{!isLoading && <Thumbnail>{thumbnailUrl}</Thumbnail>}
		{!isLoading && <Subtitle variant="h6">{subtitle}</Subtitle>}
		<Title variant="h5">
			{isLoading ? 'loading...' : title}
		</Title>
		{!isLoading && <Summary>{getSummary(summary)}</Summary>}
	</Container>
);

Tooltip.propTypes = {
	id: PropTypes.string,
	title: PropTypes.string,
	subtitle: PropTypes.string,
	summary: PropTypes.string,
	thumbnailUrl: PropTypes.string,
	isLoading: PropTypes.bool,
	position: PropTypes.oneOf(['left', 'right']),
};

Tooltip.defaultProps = {
	id: undefined,
	title: undefined,
	subtitle: undefined,
	summary: undefined,
	thumbnailUrl: undefined,
	isLoading: true,
	position: 'right',
};

const TooltipTrigger = ({
	children,
	onMouseEnter,
	onMouseLeave,
	...props
}) => (
	<Trigger
		onMouseEnter={onMouseEnter}
		onMouseLeave={onMouseLeave}
	>
		{children}
		<Tooltip {...props} />
	</Trigger>
);

TooltipTrigger.propTypes = {
	onMouseEnter: PropTypes.func,
	onMouseLeave: PropTypes.func,
};

TooltipTrigger.defaultProps = {
	onMouseEnter: () => {},
	onMouseLeave: () => {},
};

export default TooltipTrigger;

