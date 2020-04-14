import { Module } from "@nestjs/common";

import { JsonModule } from "src/json/json.module";
import { DiagramModule } from "src/diagram/diagram.module";
import { DatabaseModule } from "src/database/database.module";
import { requirementProviders } from "./requirement.providers";
import { CalculateProfileModule } from "src/calculate-profile/calculate-profile.module";

@Module({
	imports: [DatabaseModule, JsonModule, CalculateProfileModule, DiagramModule],
	providers: [...requirementProviders],
	exports: [...requirementProviders],
})
export class RequirementModule {}
