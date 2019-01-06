import { withoutReRender } from '../../utils/hocUtil';
import { DocumentLegend as Dl, EventLegend as El } from './Legend';

export const DocumentLegend = withoutReRender(Dl);
export const EventLegend = withoutReRender(El);
