import math from "mathjs";
import { Injectable } from "@nestjs/common";

import IIndex from "src/project/interfaces/index.interface";
import IMetric from "src/project/interfaces/metric.interface";

@Injectable()
export class CalculateProfileService {
	public calculate(nameIndex: string, profile: IIndex[], exclude?: string[]): number {
		if (exclude && exclude.includes(nameIndex)) {
			return 1;
		}
		const index = profile.find(index => index.name === nameIndex);
		if (!index) {
			throw RangeError("index is not found");
		}

		let result = 0;

		for (const coefficient of index.coefficients) {
			if (coefficient.metric) {
				let metricValue = coefficient.metric.value;
				if (!metricValue) {
					metricValue = this.calculateMetric(coefficient.metric);
				}
				result = coefficient.value * metricValue + result;
			} else {
				result =
					coefficient.value *
						this.calculate(coefficient.nameConnect, profile, exclude) +
					result;
			}
		}
		return result;
	}

	private calculateMetric(metric: IMetric): number {
		let result = 0;
		const primitive = metric.primitive;
		if (primitive) {
			const variables = primitive.primitives.reduce(
				(obj, item) => Object.assign(obj, { [item.name]: item.value }),
				{},
			);
			result = math.evaluate(primitive.formula, variables);
		}
		return result;
	}
}
