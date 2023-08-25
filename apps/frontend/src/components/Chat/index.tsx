import { useStore } from '../../mobx/store';
import Icon from '../../components/Main/Icon';
import React, { useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react';

const ChatComponent = () => {
    const store = useStore();

    const [message, setMessage] = useState('');

    const user = store.gamesStore.currentUserId;

    const ref = useRef<null | HTMLDivElement>(null);

    const scrollToBottom = () => {
        if (ref.current) {
            ref.current?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        store.messagesStore.sendMessage(message);
        setMessage('');
    };

    useEffect(() => {
        scrollToBottom();
    }, [store.messagesStore.messages]);

    return (
        <div className="chat">
            <div className="chat__area">
                {store.messagesStore.messages.map(msg => <div className="chat__area-message" key={msg.id}>
                    <span className={msg.userId === Number(user) ? 'user' : 'enemy'}>
                        {msg.userId === Number(user) ? 'Вы: ' : 'Соперник: '}
                    </span>{msg.message}
                </div>)}
                <div className="chat__area-end" ref={ref} />
            </div>
            <div className="chat__input">
                <form onSubmit={handleSubmit}>
                    <input
                        placeholder="Написать в чат"
                        type="text" className="input"
                        onChange={(e) => setMessage(e.target.value)}
                        value={message}
                    />
                    <Icon name="input" className="input__icon" />
                </form>
            </div>
        </div>
    );
};

export const Chat = observer(ChatComponent);
