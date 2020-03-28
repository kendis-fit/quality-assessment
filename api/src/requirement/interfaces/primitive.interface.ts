import { ApiProperty } from "@nestjs/swagger";

export default class IPrimitive {
	@ApiProperty()
	public name: string;

	@ApiProperty()
	public value: number | null;

	@ApiProperty()
	public description: string;
}
