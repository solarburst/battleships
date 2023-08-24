import { useStore } from '../../mobx/store';
import Icon from '../../components/Main/Icon';
import React, { KeyboardEvent, useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react';

const ChatComponent = () => {
    const store = useStore();

    const [message, setMessage] = useState('');

    const messages = store.messagesStore.messages;

    const user = store.gamesStore.currentUserId;

    const ref = useRef(null);

    const scrollToBottom = () => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleSubmit = (e: KeyboardEvent) => {
        if (message && e.key === 'Enter') {
            store.messagesStore.sendMessage(message);
            setMessage('');
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [store.messagesStore.messages]);

    console.log('qwe', store.messagesStore.messages.length);

    return (
        <div className="chat">
            <div className="chat__area">
                {store.messagesStore.messages.map(message => <div className="chat__area-message" key={message.id}>
                    <span className={message.userId === Number(user) ? 'user' : 'enemy'}>
                        {message.userId === Number(user) ? 'Вы: ' : 'Соперник: '}
                    </span>{message.message}
                </div>)}
                <div className="chat__area-end" ref={ref} />
            </div>
            <div className="chat__input">
                <input placeholder="Написать в чат" type="text" className="input" onChange={(e) => setMessage(e.target.value)} value={message} onKeyDown={(e) => handleSubmit(e)} />
                <Icon name="input" className="input__icon" />
            </div>
        </div>
    );
};

export const Chat = observer(ChatComponent);
