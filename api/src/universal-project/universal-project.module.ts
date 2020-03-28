import { Module } from "@nestjs/common";
import { UniversalProjectService } from "./universal-project.service";
import { UniversalProjectController } from "./universal-project.controller";
import { DatabaseModule } from "src/database/database.module";
import { JsonModule } from "src/json/json.module";
import { universalProjectProviders } from "./universal-project.providers";

@Module({
	imports: [DatabaseModule, JsonModule],
	controllers: [UniversalProjectController],
	providers: [UniversalProjectService, ...universalProjectProviders],
})
export class UniversalProjectModule {}
