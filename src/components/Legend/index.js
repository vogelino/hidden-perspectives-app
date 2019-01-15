import { withoutReRender } from '../../utils/hocUtil';
import {
	DocumentLegend as Dl,
	EventLegend as El,
	MainTimelineLegend as MTL,
} from './Legend';

export const DocumentLegend = withoutReRender(Dl);
export const EventLegend = withoutReRender(El);
export const MainTimelineLegend = withoutReRender(MTL);
