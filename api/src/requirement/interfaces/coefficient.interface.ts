import IMetric from "./metric.interface";

export default interface ICoefficient {
	name: string;
	nameConnect?: string;
	value: number | null;
	metric?: IMetric;
}
