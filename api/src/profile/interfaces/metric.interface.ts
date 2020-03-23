import IPrimitive from "./primitive.interface";

export default interface IMetric
{
    name: string;
    nameMetric: string;
    value: number | null;
    description: string;
    primitives?: IPrimitive[];
}