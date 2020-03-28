import { IPrimitiveMeta } from "./primitive-meta.interface";

export default interface IMetric {
	name: string;
	nameMetric: string;
	value: number | null;
	description: string;
	primitive?: IPrimitiveMeta;
}
