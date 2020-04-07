import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber } from "class-validator";

export default class IPrimitive {
	@ApiProperty()
	@IsString()
	public name: string;

	@ApiProperty()
	@IsNumber()
	public value: number | null;

	@ApiProperty()
	@IsString()
	public description: string;
}
