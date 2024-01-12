import { Sampling } from './sampling.interface';

export interface SamplingRange {
	id: string;
	numberSamples: number;
	sampling: Sampling;
}
