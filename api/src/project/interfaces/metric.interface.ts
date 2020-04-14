import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsNumber, IsOptional, IsObject } from "class-validator";

import { IPrimitiveMeta } from "./primitive-meta.interface";

export default class IMetric {
	@ApiProperty()
	@IsString()
	public name: string;

	@ApiProperty()
	@IsString()
	public nameMetric: string;

	@ApiProperty()
	@IsNumber()
	public value: number | null;

	@ApiProperty()
	@IsNumber()
	public description: string;

	@ApiPropertyOptional()
	@ApiProperty({ type: () => IPrimitiveMeta })
	@IsOptional()
	@IsObject()
	public primitive?: IPrimitiveMeta;
}
