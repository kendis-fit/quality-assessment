import { Module } from "@nestjs/common";

import { JsonModule } from "src/json/json.module";
import { DiagramModule } from "src/diagram/diagram.module";
import { RequirementService } from "./requirement.service";
import { DatabaseModule } from "src/database/database.module";
import { requirementProviders } from "./requirement.providers";
import { RequirementController } from "./requirement.controller";
import { CalculateProfileModule } from "src/calculate-profile/calculate-profile.module";

@Module({
	imports: [DatabaseModule, JsonModule, CalculateProfileModule, DiagramModule],
	controllers: [RequirementController],
	providers: [...requirementProviders, RequirementService],
	exports: [...requirementProviders],
})
export class RequirementModule {}
