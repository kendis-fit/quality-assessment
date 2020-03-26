import { Module } from '@nestjs/common';
import { jsonProviders } from './json.providers';

@Module({
    providers: [...jsonProviders],
    exports: [...jsonProviders]
})
export class JsonModule {}
