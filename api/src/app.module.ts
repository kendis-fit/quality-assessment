import { Module } from "@nestjs/common";

import { RequirementModule } from "./requirement/requirement.module";
import { ProjectModule } from "./project/project.module";
import { UniversalProjectModule } from "./universal-project/universal-project.module";
import { CalculateProfileModule } from './calculate-profile/calculate-profile.module';

@Module({
	imports: [RequirementModule, ProjectModule, UniversalProjectModule, CalculateProfileModule],
})
export class AppModule {}
