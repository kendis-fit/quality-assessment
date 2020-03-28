import math from "mathjs";
import { Injectable } from '@nestjs/common';

import IIndex from 'src/requirement/interfaces/index.interface';

@Injectable()
export class CalculateProfileService {
    public calculate(nameIndex: string, profile: IIndex[]): number {
        
        const index = profile.find(index => index.name === nameIndex);
        if (index === null) {
            throw RangeError("index is not found");
        }

        let result = 0;

        for (const coefficient of index.coefficients) {
            if (coefficient.metric) {
                let metricValue = coefficient.metric.value;
                if (metricValue === null) {
                    const primitive = coefficient.metric.primitive;
                    if (primitive !== null) {
                        const variables = primitive.primitives.reduce((obj, item) => Object.assign(obj, { [item.name]: item.value }), {});
                        metricValue = math.evaluate(primitive.formula, variables);
                    }
                }
                result = coefficient.value * metricValue + result;
            } else {
                result = coefficient.value * this.calculate(coefficient.nameConnect, profile) + result;
            }
        }
        return result;
    }
}
