import {
	pipe,
	toUpper,
	ifElse,
	identity,
	length,
	lt,
	join,
	append,
	head,
	splitAt,
} from 'ramda';
import initials from 'initials';

export const ucFirst = (string) => `${string.charAt(0).toUpperCase()}${string.slice(1)}`;

export const getInitialsPair = pipe(
	initials,
	toUpper,
	(x) => x.substring(0, 2),
);

export const getCapsOnlyInitials = (string) => {
	const maxLength = 4;
	const initialsString = initials(string);
	if (initialsString.length <= maxLength) return initialsString.toUpperCase();
	const upperChars = initialsString.split('').filter((char) => char === char.toUpperCase());
	const combinedString = upperChars.join('');
	return combinedString.substring(0, maxLength);
};

export const getShortenedString = (string, maxLength) => {
	const isBiggerThanMax = pipe(length, lt(maxLength));
	const shortenToMax = pipe(
		splitAt(maxLength),
		head,
		append('…'),
		join(''),
	);
	const getString = ifElse(isBiggerThanMax, shortenToMax, identity);

	return getString(string);
};
