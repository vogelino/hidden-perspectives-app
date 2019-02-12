import wiki from 'wikijs';
import debounce from 'lodash.debounce';

const buildImageUrl = (imageUrl, size = 100) => {
	const urlPrefix = 'https://upload.wikimedia.org/wikipedia/';
	const rest = imageUrl.replace(urlPrefix, '');
	const [languageCode, folder, page, fileName] = rest.split('/');
	const roundedSize = Math.round(size * 2.5);
	const url = `${urlPrefix}${languageCode}/thumb/${folder}/${page}/${fileName}/${roundedSize}px-${fileName}`;
	return url;
};

const getImageCache = () => {
	const cacheString = window.localStorage.getItem('hp-protagonist-images');
	return cacheString ? JSON.parse(cacheString) : {};
};


const imageCache = getImageCache();

const getFromCache = (id, size) => imageCache[`${id}-${size}`];
const setToCache = (id, size, url) => {
	imageCache[`${id}-${size}`] = { id, size, url };
};

const updateImageCache = debounce(() => {
	window.localStorage.setItem('hp-protagonist-images', JSON.stringify(imageCache));
}, 200, { trailing: true });

export const getWikipediaImage = (pageName, id, size) => {
	const cacheImage = getFromCache(id, size);
	if (cacheImage) return Promise.resolve(cacheImage.url);
	return wiki(({
		apiUrl: 'https://en.wikipedia.org/w/api.php',
		origin: '*',
	})).page(pageName)
		.then((page) => page.mainImage())
		.then((mainImage) => new Promise((resolve) => {
			const image = new Image();
			const url = buildImageUrl(mainImage, size);

			image.onload = function onImageLoad() {
				resolve(this.src);
				setToCache(id, size, this.src);
				updateImageCache();
			};
			image.onerror = function onImageError() {
				resolve(undefined);
				setToCache(id, size);
				updateImageCache();
			};
			// eslint-disable-next-line prefer-destructuring
			image.src = url;
		}))
		.catch(() => Promise.resolve(undefined));
};

export const getWikipediaImagePerUrl = (wikiUrl, id, size) => {
	const pageName = wikiUrl.replace('http://en.wikipedia.org/wiki/', '');
	return getWikipediaImage(pageName, id, size);
};
