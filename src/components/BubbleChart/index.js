import {
	compose,
	withProps,
	lifecycle,
	withState,
	withHandlers,
} from 'recompose';
import BubbleChart from './BubbleChart';
import { calcBubbleLayout, calcForceLayout } from './calculateChartLayout';
import { getWikipediaImagePerUrl } from '../../utils/imageUtil';

const formatItems = (bubblesData, activeId) => {
	const formattedData = Object.keys(bubblesData).map((key) => ({
		...bubblesData[key],
		id: key,
		name: bubblesData[key][0].stakeholderFullName,
		value: bubblesData[key].length,
		isActive: key === activeId,
	}));
	return {
		name: 'protagonists',
		children: formattedData.filter((item) => !item.isActive),
	};
};

const getImageCache = () => {
	const cacheString = window.localStorage.getItem('hp-protagonist-images');
	return cacheString ? JSON.parse(cacheString) : {};
};

let imageCache;

const updateImageCache = () => {
	window.localStorage.setItem('hp-protagonist-images', JSON.stringify(imageCache));
};

export default compose(
	withState('images', 'setImages', []),
	withProps(({
		items,
		diameter,
		bubblesPadding,
		activeId,
		radialLayout,
	}) => {
		const formattedItems = formatItems(items, activeId);
		const bubbleLayout = calcBubbleLayout(
			formattedItems,
			radialLayout ? diameter * 0.75 : diameter,
			bubblesPadding,
		).children;

		return {
			bubbleLayoutItems: radialLayout
				? calcForceLayout(
					bubbleLayout,
					diameter,
				)
				: bubbleLayout,
		};
	}),
	withHandlers({
		fetchImages: (props) => (prevProps) => {
			const { bubbleLayoutItems: newItems } = props;
			const { bubbleLayoutItems: oldItems } = prevProps;
			const isFirstRender = (!oldItems || oldItems.length === 0) && (newItems && newItems.length);
			const isSecondRender = !isFirstRender
				&& oldItems
				&& newItems
				&& oldItems.length !== newItems.length;
			if (isFirstRender || isSecondRender) {
				const { bubbleLayoutItems, setImages } = props;
				setImages([]);
				const loadAllImages = bubbleLayoutItems.map((item) => {
					const { id, name } = item.data;
					const size = Math.ceil(item.r * 2);
					if (Object.hasOwnProperty.call(imageCache, id)) {
						return Promise.resolve({
							id,
							url: imageCache[id],
							size,
							x: item.x - item.r,
							y: item.y - item.r,
						});
					}
					return getWikipediaImagePerUrl(name, size).then((url) => ({
						id,
						url,
						size,
						x: item.x - item.r,
						y: item.y - item.r,
					}));
				});

				Promise.all(loadAllImages).then((images) => {
					const newImages = [];
					images.forEach((image) => {
						if (!imageCache[image.id]) {
							imageCache[image.id] = image.url || false;
						}
						if (!image.url) return;
						newImages.push(image);
					});
					setImages(newImages);
				});
			}
		},
	}),
	lifecycle({
		componentDidMount() {
			imageCache = getImageCache();
		},
		componentDidUpdate(prevProps) {
			if (prevProps.bubbleLayoutItems === this.props.bubbleLayoutItems) return;
			if (prevProps.images !== this.props.images) {
				updateImageCache();
			}
			this.props.fetchImages(prevProps);
		},
	}),
)(BubbleChart);
