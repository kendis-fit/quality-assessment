import { Module } from "@nestjs/common";

import { DatabaseModule } from "src/database/database.module";
import { requirementProviders } from "./requirement.providers";
import { RequirementController } from "./requirement.controller";
import { RequirementService } from "./requirement.service";
import { JsonModule } from "src/json/json.module";

@Module({
	imports: [DatabaseModule, JsonModule],
	controllers: [RequirementController],
	providers: [...requirementProviders, RequirementService],
})
export class RequirementModule {}
