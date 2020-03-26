import { Module } from "@nestjs/common";

import { RequirementModule } from "./requirement/requirement.module";
import { ProjectModule } from './project/project.module';

@Module({
	imports: [RequirementModule, ProjectModule],
})
export class AppModule {}
