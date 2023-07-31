import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { UserEntity } from '../users/entities/user.entity';
import { GameEntity } from '../games/entities/game.entity';
import { MessageEntity } from '../messages/entities/message.entity';
import { ShipEntity } from '../ships/entities/ship.entity';
import { ShotEntity } from '../shots/entities/shot.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        entities:  [UserEntity, GameEntity, MessageEntity, ShipEntity, ShotEntity],
        synchronize: true,
      })
    }),
  ],
})
export class DatabaseModule {}