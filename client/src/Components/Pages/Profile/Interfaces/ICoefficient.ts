import { IMetric } from "./IMetric";

export interface ICoefficient {
	name: string;	
	nameConnect?: string;
	value: number | null;
	metric?: IMetric;
}
