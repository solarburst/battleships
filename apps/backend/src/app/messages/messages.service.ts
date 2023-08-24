import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MessageEntity } from './entities/message.entity';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { MessageDto, PaginationDto } from './dto/message.dto';

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

    async getGameMessages(gameId: number, paginationDto: PaginationDto): Promise<Pagination<MessageEntity>> {
        const { page, limit } = paginationDto;
        const options = { page, limit };

        return paginate<MessageEntity>(this.messagesRepository, options, {
            where: { gameId },
            order: { id: 'DESC' },
        });
    }
}
