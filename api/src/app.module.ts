import { Module } from "@nestjs/common";

import { ProjectModule } from "./project/project.module";
import { RequirementModule } from "./requirement/requirement.module";
import { UserModule } from './user/user.module';

@Module({
	imports: [RequirementModule, ProjectModule, UserModule],
})
export class AppModule {}
