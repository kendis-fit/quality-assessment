import ICoefficient from "./coefficient.interface";

export default interface IIndex
{
    name: string;
    nameIndex: string;
    description: string;
    coefficients: ICoefficient[];
}