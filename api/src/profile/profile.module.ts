import { Module } from "@nestjs/common";
import { ProfileController } from "./profile.controller";
import { DatabaseModule } from "src/database/database.module";

@Module({
    imports: [DatabaseModule],
	controllers: [ProfileController],
})
export class ProfileModule {}
