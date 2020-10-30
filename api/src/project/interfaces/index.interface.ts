import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsArray } from "class-validator";

import ICoefficient from "./coefficient.interface";

export default class IIndex {
	@ApiProperty()
	@IsString()
	public name: string;

	@ApiProperty()
	@IsString()
	public nameIndex: string;

	@ApiProperty()
	@IsString()
	public description: string;

	@ApiProperty({ type: () => [ICoefficient] })
	@IsArray()
	public coefficients: ICoefficient[];
}
