import { ApiProperty } from "@nestjs/swagger";

import IMetric from "./metric.interface";

export default class ICoefficient {
	@ApiProperty()
	public name: string;

	@ApiProperty()
	public nameConnect?: string;

	@ApiProperty()
	value: number | null;

	@ApiProperty({ type: () => IMetric })
	metric?: IMetric;
}
