import { Module } from "@nestjs/common";

import { ProjectModule } from "./project/project.module";
import { RequirementModule } from "./requirement/requirement.module";
import { UniversalProjectModule } from "./universal-project/universal-project.module";
import { UserModule } from './user/user.module';

@Module({
	imports: [RequirementModule, ProjectModule, UniversalProjectModule, UserModule],
})
export class AppModule {}
