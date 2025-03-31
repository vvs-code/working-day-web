import type {FC} from 'react';

import './style.css';
import type {Message} from '../../shared/api/types.ts';

type Props = {
    message: Message;
    isMyMessage?: boolean;
};

export const MessageDrawer: FC<Props> = ({message, isMyMessage}) => {
    const timeFormatted = new Date(message.timestamp).toLocaleString('ru', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    });

    return (
        <div className={`message ${isMyMessage ? 'message--my' : 'message--other'}`}>
            <div className="message__wrapper">
                <span className="message__text">{message.content.content}</span>
                <span className="message__time">{timeFormatted}</span>
            </div>
        </div>
    );
};
