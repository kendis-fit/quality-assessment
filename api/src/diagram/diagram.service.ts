import { Injectable } from "@nestjs/common";

import { DiagramProfile } from "./dto/diagram-profile.dto";
import IIndex from "src/project/interfaces/index.interface";
import { CalculateProfileService } from "src/calculate-profile/calculate-profile.service";

@Injectable()
export class DiagramService {
	public constructor(
		private calculateProfileService: CalculateProfileService,
	) {}

	public create(nameIndex: string, profile: IIndex[]): DiagramProfile[] {
		const index = profile.find(index => index.name === nameIndex);
		if (!index) {
			throw RangeError("index is not found");
		}

		const diagram: DiagramProfile[] = [];
		for (const coefficient of index.coefficients) {
			let result: DiagramProfile | null = null;

			if (coefficient.metric) {
				result = {
					nameIndex: `${coefficient.name} (${coefficient.value})`,
					value: coefficient.value * coefficient.metric.value,
				};
			} else {
				result = {
					nameIndex: `${coefficient.name} (${coefficient.value})`,
					value: this.calculateProfileService.calculate(
						coefficient.nameConnect,
						profile,
					),
				};
			}
			diagram.push(result);
		}

		return diagram;
	}
}
