import wiki from 'wikijs';

export const getWikipediaImage = (name) => wiki().page(name)
	.then((page) => page.images())
	.then((images) => new Promise((resolve) => {
		const jpgs = images.filter((img) => img.endsWith('.jpg'));
		const image = new Image();
		image.onload = function onImageLoad() {
			resolve(this.src);
		};
		// eslint-disable-next-line prefer-destructuring
		image.src = jpgs[0];
	}));
