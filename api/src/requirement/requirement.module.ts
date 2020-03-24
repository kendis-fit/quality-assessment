import { Module } from "@nestjs/common";
import { RequirementController } from "./requirement.controller";
import { DatabaseModule } from "src/database/database.module";

@Module({
    imports: [DatabaseModule],
	controllers: [RequirementController],
})
export class RequirementModule {}
