import { Module } from "@nestjs/common";

import { JsonModule } from "src/json/json.module";
import { DatabaseModule } from "src/database/database.module";
import { UniversalProjectService } from "./universal-project.service";
import { universalProjectProviders } from "./universal-project.providers";
import { UniversalProjectController } from "./universal-project.controller";
import { CalculateProfileModule } from "src/calculate-profile/calculate-profile.module";

@Module({
	imports: [DatabaseModule, JsonModule, CalculateProfileModule],
	controllers: [UniversalProjectController],
	providers: [UniversalProjectService, ...universalProjectProviders],
})
export class UniversalProjectModule {}
