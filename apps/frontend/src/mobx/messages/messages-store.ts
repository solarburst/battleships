import { flow, types } from 'mobx-state-tree';
import { RequestCreator } from '../../api/request-creator';
import { IMessage, MessageModel } from './messages-model';
import { createBaseStore } from '../../mobx/base-store';
import { useStore } from '../../mobx/store';

const requestCreator = RequestCreator.getInstance();

export const MessagesStore = types
    .compose(
        types.model({}),
        createBaseStore<IMessage>(MessageModel),
    )
    .views(self => ({
        get messages() {
            return Array.from(self.store.values());
        },
    }))
    .actions(self => ({
        sendMessage: flow(function *(message: string) {
            const store = useStore();

            const sentMessage = yield requestCreator.sendMessage({
                message,
            });

            store.messagesStore.createModel({
                ...sentMessage,
                id: sentMessage.id.toString(),
            });

            // store.messagesStore.fetchMessages();
        }),
        fetchMessages: flow(function *() {
            const store = useStore();

            const messagesArr: IMessage[] = yield requestCreator.getMessages();

            messagesArr?.forEach(message => {
                store.messagesStore.createModel({
                    ...message,
                    id: message.id.toString(),
                });
            });
        }),
    }));
