import {type FC, type ReactNode, createContext, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {io} from 'socket.io-client';
import MessengerAPI from '../api/MessengerAPI.ts';
import type {Chat, Employee, Message} from '../api/types.ts';
import {CONFIG} from '../config.ts';
import type {StorageChatsDict} from './types.ts';

type StorageContextType = {
    chats: StorageChatsDict;
    chatsLoading: boolean;
    refetchChats: () => void;
    loadChat: (chatId: string) => void;
    sendMessage: (message: string) => void;
    currentChatLoading: boolean;
    allEmployees: Employee[];
};

export const StorageContext = createContext<StorageContextType>({
    chats: {},
    chatsLoading: false,
    refetchChats: () => {},
    loadChat: () => {},
    sendMessage: () => {},
    currentChatLoading: true,
    allEmployees: [],
});

type StorageContextProviderProps = {
    children: ReactNode;
};

const SEND_MESSAGE_EVENT = 'send';
const RECEIVE_MESSAGE_EVENT = 'send';

export const StorageContextProvider: FC<StorageContextProviderProps> = ({children}) => {
    const cachedData = JSON.parse(localStorage.getItem('messenger') ?? '{}');

    const [chats, setChats] = useState<StorageChatsDict>(cachedData);
    const [chatsLoading, setChatsLoading] = useState<boolean>(false);
    const [currentChatLoading, setCurrentChatLoading] = useState<boolean>(false);
    const [allEmployees, setAllEmployees] = useState<Employee[]>([]);

    const initialized = useRef<boolean>(false);
    const loadedChats = useRef<string[]>([]);

    const socketRef = useRef(null);

    const mergeChats = useCallback(
        (fetchedChats: Chat[]) => {
            const newChats: StorageChatsDict = {...chats};

            for (const fetchedChat of fetchedChats) {
                if (newChats[fetchedChat.chat_id]) {
                    newChats[fetchedChat.chat_id].last_message = fetchedChat.last_message;
                } else {
                    newChats[fetchedChat.chat_id] = {
                        ...fetchedChat,
                        messages: [],
                    };
                }
            }

            setChats(newChats);
        },
        [chats],
    );

    const pushMessages = useCallback(
        (chatId: string, messages: Message[]) => {
            const newChats: StorageChatsDict = {...chats};
            newChats[chatId].messages = messages;
            setChats(newChats);
        },
        [chats],
    );

    const refetchChats = useCallback(() => {
        setChatsLoading(true);
        MessengerAPI.ListChats()
            .then(mergeChats)
            .finally(() => setChatsLoading(false));
    }, [mergeChats]);

    useEffect(() => {
        localStorage.setItem('messenger', JSON.stringify(chats));
    }, [chats]);

    useEffect(() => {
        if (!initialized.current) {
            initialized.current = true;
            refetchChats();
            MessengerAPI.GetAllEmployees().then(setAllEmployees);
        }
    }, [refetchChats]);

    const sendMessage = useCallback((message: string) => {
        socketRef.current?.emit(SEND_MESSAGE_EVENT, {message});
    }, []);

    const handleMessage = useCallback(
        (message: Message) => {
            chats[message.chat_id].messages.push(message);
        },
        [chats],
    );

    // useEffect(() => {
    //     socketRef.current = io(CONFIG.socketUrl);
    //
    //     socketRef.current?.on(RECEIVE_MESSAGE_EVENT, handleMessage);
    //
    //     return socketRef.current?.disconnect;
    // }, [handleMessage]);

    const loadChat = useCallback(
        (chatId: string) => {
            if (!loadedChats.current.includes(chatId)) {
                loadedChats.current.push(chatId);
                setCurrentChatLoading(true);
                MessengerAPI.LoadRecentMessages({chat_id: chatId})
                    .then((messages) => pushMessages(chatId, messages))
                    .finally(() => setCurrentChatLoading(false));
            }
        },
        [pushMessages],
    );

    return (
        <StorageContext.Provider
            value={{
                chats,
                chatsLoading,
                refetchChats,
                sendMessage,
                loadChat,
                currentChatLoading,
                allEmployees,
            }}
        >
            {children}
        </StorageContext.Provider>
    );
};
