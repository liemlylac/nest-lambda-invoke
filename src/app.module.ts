import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { providers } from './common/app.providers';
import { MysqlModule } from './database/mysql.module';
import { ConfigModule } from './config/config.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [ConfigModule.forRoot(), MysqlModule.forRoot(), TaskModule],
  controllers: [AppController],
  providers: [...providers, AppService],
})
export class AppModule {}
