import IMetric from "./metric.interface";

export default interface ICoefficient
{
    name: string;
    value: number | null;
    metric?: IMetric;
}