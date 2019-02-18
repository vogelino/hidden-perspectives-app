import { onlyUpdateForKeys } from 'recompose';
import Bubbles from './Bubbles';

export default onlyUpdateForKeys([
	'bubbleLayoutItems',
	'hoveredElement',
	'pinnedElement',
	'images',
	'activeElementId',
])(Bubbles);
