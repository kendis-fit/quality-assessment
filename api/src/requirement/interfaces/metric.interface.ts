import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

import { IPrimitiveMeta } from "./primitive-meta.interface";

export default class IMetric {
	@ApiProperty()
	public name: string;
	
	@ApiProperty()
	public nameMetric: string;

	@ApiProperty()
	public value: number | null;
	
	@ApiProperty()
	public description: string;

	@ApiPropertyOptional()
	@ApiProperty({ type: () => IPrimitiveMeta })
	public primitive?: IPrimitiveMeta;
}
