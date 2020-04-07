import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsOptional, IsObject, IsNumber } from "class-validator";

import IMetric from "./metric.interface";

export default class ICoefficient {
	@ApiProperty()
	@IsString()
	public name: string;

	@ApiProperty()
	@IsString()
	public nameConnect?: string;

	@ApiProperty()
	@IsNumber()
	value: number | null;

	@ApiPropertyOptional()
	@ApiProperty({ type: () => IMetric })
	@IsOptional()
	@IsObject()
	metric?: IMetric;
}
