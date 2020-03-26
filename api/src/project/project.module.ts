import { Module } from '@nestjs/common';

import { JsonModule } from 'src/json/json.module';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule, JsonModule],
  controllers: [ProjectController],
  providers: [ProjectService]
})
export class ProjectModule {}
