import {
	pipe,
	toUpper,
	split,
	filter,
	join,
} from 'ramda';
import initials from 'initials';

export const ucFirst = (string) => `${string.charAt(0).toUpperCase()}${string.slice(1)}`;

export const getInitialsPair = pipe(
	initials,
	toUpper,
	(x) => x.substring(0, 2),
);

export const getCapsOnlyInitials = pipe(
	initials,
	split(''),
	filter((char) => char === char.toUpperCase()),
	join(''),
	(x) => x.substring(0, 4),
);
