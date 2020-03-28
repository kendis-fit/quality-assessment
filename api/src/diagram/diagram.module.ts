import { Module } from '@nestjs/common';

import { DiagramService } from './diagram.service';
import { CalculateProfileModule } from 'src/calculate-profile/calculate-profile.module';

@Module({
	imports: [CalculateProfileModule],
	providers: [DiagramService],
	exports: [DiagramService]
})
export class DiagramModule {}
