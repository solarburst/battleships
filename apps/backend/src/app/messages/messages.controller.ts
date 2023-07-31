import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessageDto } from './dto/message.dto';

@Controller('messages')
export class MessagesController {
    constructor(
        private readonly messagesService: MessagesService
    ) {}

    @Post()
    async createMessage(@Body() message: MessageDto) {
        return this.messagesService.createMessage(message);
    }
}
