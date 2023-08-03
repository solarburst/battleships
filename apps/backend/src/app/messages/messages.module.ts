import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { MessageEntity } from './entities/message.entity';

@Module({
    imports: [TypeOrmModule.forFeature([MessageEntity])],
    providers: [MessagesService],
    controllers: [MessagesController],
    exports: [MessagesService],
})
export class MessagesModule {}
