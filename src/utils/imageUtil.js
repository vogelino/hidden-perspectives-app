import wiki from 'wikijs';

const buildImageUrl = (imageUrl, size = 100) => {
	const urlPrefix = 'https://upload.wikimedia.org/wikipedia/';
	const rest = imageUrl.replace(urlPrefix, '');
	const [languageCode, folder, page, fileName] = rest.split('/');
	const url = `${urlPrefix}${languageCode}/thumb/${folder}/${page}/${fileName}/${size
		* 2.5}px-${fileName}`;
	return url;
};

export const getWikipediaImage = (pageName) => wiki(({
	apiUrl: 'https://en.wikipedia.org/w/api.php',
	origin: '*',
})).page(pageName)
	.then((page) => page.mainImage())
	.then((mainImage) => new Promise((resolve) => {
		const image = new Image();
		const url = buildImageUrl(mainImage);

		image.onload = function onImageLoad() {
			resolve(this.src);
		};
		image.onerror = function onImageError() {
			resolve(undefined);
		};
		// eslint-disable-next-line prefer-destructuring
		image.src = url;
	}))
	.catch(() => Promise.resolve(undefined));

export const getWikipediaImagePerUrl = (wikiUrl) => {
	const pageName = wikiUrl.replace('http://en.wikipedia.org/wiki/', '');
	return getWikipediaImage(pageName);
};
