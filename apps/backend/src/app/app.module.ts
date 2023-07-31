import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from "@hapi/joi";

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { GamesModule } from './games/games.module';
import { MessagesModule } from './messages/messages.module';
import { ShipsModule } from './ships/ships.module';
import { ShotsModule } from './shots/shots.module';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: 'envs/.backend.env',
    validationSchema: Joi.object({
      POSTGRES_HOST: Joi.string().required(),
      POSTGRES_PORT: Joi.number().required(),
      POSTGRES_USER: Joi.string().required(),
      POSTGRES_PASSWORD: Joi.string().required(),
      POSTGRES_DB: Joi.string().required(),
    })
  }),
  DatabaseModule,
  UsersModule,
  GamesModule,
  MessagesModule,
  ShipsModule,
  ShotsModule,
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
