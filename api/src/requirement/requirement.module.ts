import { Module } from "@nestjs/common";

import { DatabaseModule } from "src/database/database.module";
import { requirementProviders } from "./requirement.providers";
import { RequirementController } from "./requirement.controller";
import { RequirementService } from './requirement.service';

@Module({
    imports: [DatabaseModule],
    controllers: [RequirementController],
    providers: [...requirementProviders, RequirementService]
})
export class RequirementModule {}
