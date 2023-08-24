import { RequestCreator } from '../../api/request-creator';
import { Instance, flow, types } from 'mobx-state-tree';

export interface IMessage {
    id: string;
    userId: number;
    message: string;
}

const requestCreator = RequestCreator.getInstance();

export const MessageModel = types
    .model({
        id: types.identifier,
        userId: types.number,
        message: types.string,
    });

export interface IMessageModel extends Instance<typeof MessageModel> { }
