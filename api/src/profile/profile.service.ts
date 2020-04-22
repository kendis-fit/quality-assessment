import { Injectable } from '@nestjs/common';
import IIndex from 'src/project/interfaces/index.interface';
import ICoefficient from 'src/project/interfaces/coefficient.interface';

@Injectable()
export class ProfileService {
    public isValid(profile: IIndex[]) {
        for (const index of profile) {
            for (const coeff of index.coefficients) {
                if (this.someCoefficientUndefined(coeff)) {
                    return false;
                }
            }
        }
        return true;
    }

    private someCoefficientUndefined(coeff: ICoefficient) {
        const emptyCoeff = !coeff.value;
        const emptyMetric = coeff.metric && !coeff.metric.value;
        const emptyPrimitives = coeff.metric && coeff.metric.primitive && 
            coeff.metric.primitive.primitives.filter(primitive => !primitive.value).length > 0;
        return emptyCoeff || emptyMetric || emptyPrimitives;
    }
}
