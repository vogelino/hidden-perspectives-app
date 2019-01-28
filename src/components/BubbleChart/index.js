import {
	compose,
	withProps,
	lifecycle,
	withState,
	withHandlers,
} from 'recompose';
import * as d3 from 'd3';
import BubbleChart from './BubbleChart';
import { getWikipediaImagePerUrl } from '../../utils/imageUtil';

const calcBubbleLayout = (data, diameter, padding) => {
	const bubbleLayout = d3.pack()
		.size([diameter, diameter])
		.padding(padding);

	const rootNode = d3
		.hierarchy(data)
		.sum((d) => d.value);

	return bubbleLayout(rootNode);
};

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
		children: formattedData,
	};
};

export default compose(
	withState('images', 'setImages', []),
	withProps(({
		item,
		items,
		diameter,
		bubblesPadding,
		activeId,
	}) => {
		const formattedItems = formatItems(items, activeId);
		const bubbleLayoutItems = calcBubbleLayout(
			formattedItems,
			diameter,
			bubblesPadding,
		).children;

		return {
			items: formattedItems,
			bubbleLayoutItems,
			activeElemenId: item ? item.id : '',
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
					return getWikipediaImagePerUrl(name, size).then((url) => ({
						id,
						url,
						size,
						x: item.x - item.r,
						y: item.y - item.r,
					}));
				});

				Promise.all(loadAllImages).then((images) => {
					setImages(images);
				});
			}
		},
	}),
	lifecycle({
		componentDidUpdate(prevProps) {
			this.props.fetchImages(prevProps);
		},
	}),
)(BubbleChart);
