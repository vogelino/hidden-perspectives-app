import wiki from 'wikijs';

export const getWikipediaImage = (pageName) => wiki().page(pageName)
	.then((page) => page.mainImage())
	.then((mainImage) => new Promise((resolve) => {
		const image = new Image();

		image.onload = function onImageLoad() {
			resolve(this.src);
		};
		image.onerror = function onImageError() {
			resolve(undefined);
		};
		// eslint-disable-next-line prefer-destructuring
		image.src = mainImage;
	}))
	.catch(() => Promise.resolve(undefined));

// ORIGINAL: https://upload.wikimedia.org/wikipedia/commons/1/14/Saeed_Jalili_2013b.jpg
// WISHED: https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Saeed_Jalili_2013b.jpg/200px-Saeed_Jalili_2013b.jpg

const buildImageUrl = (imageUrl, size = 100) => {
	const urlPrefix = 'https://upload.wikimedia.org/wikipedia/';
	const rest = imageUrl.replace(urlPrefix, '');
	const [languageCode, folder, page, fileName] = rest.split('/');
	const url = `${urlPrefix}${languageCode}/thumb/${folder}/${page}/${fileName}/${size * 2.5}px-${fileName}`;
	return url;
};

export const getWikipediaImagePerUrl = (wikiUrl) => {
	const pageName = wikiUrl.replace('http://en.wikipedia.org/wiki/', '');
	return getWikipediaImage(pageName)
		.then((imageUrl) => imageUrl && buildImageUrl(imageUrl));
};
