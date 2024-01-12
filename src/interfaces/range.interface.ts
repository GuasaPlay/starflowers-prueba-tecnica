import { SamplingRange } from './sampling-range.interface';

export interface Range {
	id: number;
	maximum: number;
	minimum: number;
	status: boolean;
	samplingRanges: SamplingRange[];
}
