import { ApiProperty } from "@nestjs/swagger";

import IPrimitive from "./primitive.interface";

export class IPrimitiveMeta {
	@ApiProperty()
	formula: string;

	@ApiProperty({ type: () => [IPrimitive] })
	primitives: IPrimitive[];
}
