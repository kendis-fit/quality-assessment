import { ApiProperty } from "@nestjs/swagger";

import ICoefficient from "./coefficient.interface";

export default class IIndex {
	@ApiProperty()	
	public name: string;
	
	@ApiProperty()
	public nameIndex: string;

	@ApiProperty()
	public description: string;

	@ApiProperty({ type: () => [ICoefficient] })
	public coefficients: ICoefficient[];
}
