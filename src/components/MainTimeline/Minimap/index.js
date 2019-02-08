import { onlyUpdateForKeys } from 'recompose';
import Minimap from './Minimap';

export default onlyUpdateForKeys(['activeYear', 'isLoading', 'items'])(Minimap);
