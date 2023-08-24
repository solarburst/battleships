import { Body, ClassSerializerInterceptor, Controller, Get, Param, Post, UseInterceptors } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessageDto } from './dto/message.dto';

@Controller('messages')
@UseInterceptors(ClassSerializerInterceptor)
export class MessagesController {
    constructor(
        private readonly messagesService: MessagesService,
    ) {}

    @Post('/:gameId/:userId')
    async createMessage(@Param('gameId') gameId: string, @Param('userId') userId: string, @Body() message: MessageDto) {
        return this.messagesService.createMessage(Number(gameId), Number(userId), message);
    }

    @Get('/:gameId')
    async getGameMessages(@Param('gameId') gameId: string) {
        return this.messagesService.getGameMessages(Number(gameId));
    }
}
