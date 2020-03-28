import ICoefficient from "./ICoefficient";

export default interface IIndex {
	name: string;
	nameIndex: string;
	description: string;
	coefficients: ICoefficient[];
}
