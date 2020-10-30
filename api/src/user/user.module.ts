import { Module } from '@nestjs/common';

import { UserService } from './user.service';
import { userProviders } from './user.providers';
import { JwtStrategy } from './auth/jwt.strategy';
import { UserController } from './user.controller';
import { ConfigModule } from 'src/config/config.module';
import { DatabaseModule } from 'src/database/database.module';

@Module({
	imports: [DatabaseModule, ConfigModule],
	controllers: [UserController],
	providers: [UserService, ...userProviders, JwtStrategy]
})
export class UserModule {}
