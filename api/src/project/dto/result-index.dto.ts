import { ApiProperty } from "@nestjs/swagger";

export class ResultIndex {
	@ApiProperty()
	public result: number;

	public constructor({ result }: ResultIndex) {
		this.result = result;
	}
}
