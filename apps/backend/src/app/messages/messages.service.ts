import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MessageEntity } from './entities/message.entity';
import { MessageDto } from './dto/message.dto';

@Injectable()
export class MessagesService {
    constructor(
        @InjectRepository(MessageEntity)
        private messagesRepository: Repository<MessageEntity>,
    ) {}

    async createMessage(gameId: number, userId: number, message: MessageDto) {
        const newMessage = await this.messagesRepository.create({
            ...message,
            gameId,
            userId,
        });

        await this.messagesRepository.save(newMessage);

        return newMessage;
    }

    async getGameMessages(gameId: number) {
        const gameMessages = await this.messagesRepository.find({ where: { gameId }});

        return gameMessages;
    }
}
