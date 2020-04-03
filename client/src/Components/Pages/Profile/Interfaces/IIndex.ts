import ICoefficient from "./ICoefficient";

export interface IIndex {
	name: string;
	nameIndex: string;
	description: string;
	coefficients: ICoefficient[];
}
