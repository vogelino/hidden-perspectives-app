import { pipe, toUpper } from 'ramda';
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

const defaultOptions = {
	containerWidth: 80,
	containerHeight: 20,
	// Average letter width to approximate the rendered length.
	letterWidth: 6,
	letterHeight: 14,
};

export const parseName = (string = 'Barack Obama Bush', options = defaultOptions) => {
	const {
		containerWidth, containerHeight, letterWidth, letterHeight,
	} = options;

	// Calculate how many lines we can render inside the block
	const possibleLineAmount = Math.floor(containerHeight / letterHeight);

	// TODO: define all edge cases
	let name = string
		.replace('United States', 'US')
		.replace('Tim Renton, Baron Renton of Mount Harry', 'Tim Renton');

	const nameTooLong =	Math.ceil((name.length * letterWidth) / containerWidth) > possibleLineAmount;

	let maxIterations = 5;
	// If the text is too long for the container width and the estimated lines too many
	// for the container height.
	while (nameTooLong && maxIterations > 0) {
		const names = name.split(' ').filter((n) => !['for', 'of', 'the', 'The'].includes(n));

		for (let i = 0; i < names.length; i += 1) {
			if (names[i].length > 3) {
				names[i] = `${names[i].charAt(0).toUpperCase()}.`;
				break;
			}
		}

		name = names.join(' ');
		maxIterations -= 1;
	}

	return name;

	// If the rendered text width is probably higher than the container width
};
