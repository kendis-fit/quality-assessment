import { Module } from "@nestjs/common";

import { UserModule } from './user/user.module';
import { ProjectModule } from "./project/project.module";

@Module({
	imports: [ProjectModule, UserModule],
})
export class AppModule {}
