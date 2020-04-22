import { Module } from "@nestjs/common";

import { JsonModule } from "src/json/json.module";
import { ProjectService } from "./project.service";
import { ProjectController } from "./project.controller";
import { DiagramModule } from "src/diagram/diagram.module";
import { ProfileModule } from "src/profile/profile.module";
import { DatabaseModule } from "src/database/database.module";
import { RequirementModule } from "src/requirement/requirement.module";
import { CalculateProfileModule } from "src/calculate-profile/calculate-profile.module";

@Module({
	imports: [DatabaseModule, JsonModule, RequirementModule, CalculateProfileModule, DiagramModule, ProfileModule],
	controllers: [ProjectController],
	providers: [ProjectService],
})
export class ProjectModule {}
