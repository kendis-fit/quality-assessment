import { Module } from "@nestjs/common";

import { RequirementModule } from "./requirement/requirement.module";

@Module({
	imports: [RequirementModule],
})
export class AppModule {}
