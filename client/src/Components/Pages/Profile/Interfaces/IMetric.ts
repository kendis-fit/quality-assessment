import { IPrimitiveMeta } from "./IPrimitiveMeta";

export interface IMetric {
	name: string;
	nameMetric: string;
	value: number | null;
	description: string;
	primitive?: IPrimitiveMeta;
}
