import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MessageEntity } from './entities/message.entity';
import { MessageDto } from './dto/message.dto';

@Injectable()
export class MessagesService {
    constructor(
        @InjectRepository(MessageEntity)
        private messageRepository: Repository<MessageEntity>,
    ) {}

    async createMessage(message: MessageDto) {
        const newMessage = await this.messageRepository.create(message);
        await this.messageRepository.save(newMessage);
        return newMessage;
    }
}
