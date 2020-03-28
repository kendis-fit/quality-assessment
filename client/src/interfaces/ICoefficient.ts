import IMetric from "./IMetric";

export default interface ICoefficient {
	name: string;	
	nameConnect?: string;
	value: number | null;
	metric?: IMetric;
}
