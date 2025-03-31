import {Add, Send} from '@mui/icons-material';
import {IconButton, TextField} from '@mui/material';
import {
    type FC,
    type FormEvent,
    FormEventHandler,
    type HTMLProps,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react';

import cx from 'classnames';
import './style.css';
import {MessageDrawer} from '../../entities/MessageDrawer/MessageDrawer.tsx';
import MessengerAPI from '../../shared/api/MessengerAPI.ts';
import type {Message} from '../../shared/api/types.ts';
import {StorageContext} from '../../shared/storage/StorageContext.tsx';

type Props = HTMLProps<HTMLDivElement> & {
    chatId: string;
};

const MY_MOCK_MESSAGE: Message = {
    chat_id: '',
    sender_id: 'ipetrov',
    content: {
        content: 'Test message',
    },
    timestamp: '1970-01-01T00:00:00.000000',
};

const OTHER_MOCK_MESSAGE: Message = {
    chat_id: '',
    sender_id: 'other',
    content: {
        content: 'Test message from other',
    },
    timestamp: '1970-01-01T00:00:00.000000',
};

const MOCK_MESSAGES = [
    MY_MOCK_MESSAGE,
    OTHER_MOCK_MESSAGE,
    MY_MOCK_MESSAGE,
    OTHER_MOCK_MESSAGE,
    OTHER_MOCK_MESSAGE,
    MY_MOCK_MESSAGE,
    MY_MOCK_MESSAGE,
];

export const DialogFrame: FC<Props> = ({chatId, ...rest}) => {
    const {chats, chatsLoading, loadChat, currentChatLoading, sendMessage} = useContext(StorageContext);

    const myLogin = useRef<string>(MessengerAPI.GetLogin());

    const [message, setMessage] = useState<string>('');

    useEffect(() => {
        loadChat(chatId);
    }, [loadChat, chatId]);

    const handleInput = useCallback((evt) => {
        evt.preventDefault();
        setMessage(evt.target.value);
    }, []);

    return (
        <div {...rest} className={cx('dialog-frame', rest.className)}>
            <div className="dialog-frame__header">
                {currentChatLoading ? 'Загружаем сообщения...' : chats[chatId]?.chat_name}
            </div>
            <div className="dialog-frame__content">
                <div className="dialog-frame__messages-wrapper">
                    {MOCK_MESSAGES.map((message) => (
                        <MessageDrawer
                            key={message.timestamp}
                            message={message}
                            isMyMessage={message.sender_id === myLogin.current}
                        />
                    ))}
                </div>
                <div className="dialog-frame__input-wrapper">
                    <TextField
                        fullWidth
                        label="Сообщение"
                        variant="outlined"
                        multiline
                        rows={3}
                        sx={{mt: 2}}
                        value={message}
                        onInput={handleInput}
                    />

                    <div className="dialog-frame__send-button">
                        <IconButton
                            onClick={() => {
                                sendMessage(message);
                                setMessage('');
                            }}
                            color="info"
                            disabled={!message.trim()}
                        >
                            <Send />
                        </IconButton>
                    </div>
                </div>
            </div>
        </div>
    );
};
