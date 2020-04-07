import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsArray } from "class-validator";

import IPrimitive from "./primitive.interface";

export class IPrimitiveMeta {
	@ApiProperty()
	@IsString()
	formula: string;

	@ApiProperty({ type: () => [IPrimitive] })
	@IsArray()
	primitives: IPrimitive[];
}
