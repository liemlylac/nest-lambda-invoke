import * as Joi from '@hapi/joi';
import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { config } from './config';
import { configSchema } from './config.schema';
import { ConfigService } from './config.service';

@Module({})
export class ConfigModule {
  static forRoot(): DynamicModule {
    return {
      module: ConfigModule,
      imports: [
        NestConfigModule.forRoot({
          isGlobal: true,
          load: [config],
          validationSchema: Joi.object({ ...configSchema }),
        }),
      ],
      providers: [ConfigService],
      exports: [ConfigService],
    };
  }
}
