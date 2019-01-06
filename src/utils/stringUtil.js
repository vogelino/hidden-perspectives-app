import { pipe, toUpper } from 'ramda';
import initials from 'initials';

export const ucFirst = (string) => `${string.charAt(0).toUpperCase()}${string.slice(1)}`;

export const getInitials = pipe(
	initials,
	toUpper,
	(x) => x.substring(0, 2),
);
