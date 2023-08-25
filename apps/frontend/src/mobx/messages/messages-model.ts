import { Instance, types } from 'mobx-state-tree';

export interface IMessage {
    id: string;
    userId: number;
    message: string;
}

export const MessageModel = types
    .model({
        id: types.identifier,
        userId: types.number,
        message: types.string,
    });

export interface IMessageModel extends Instance<typeof MessageModel> { }
