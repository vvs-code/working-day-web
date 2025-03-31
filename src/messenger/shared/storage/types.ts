import type {Chat, Message} from '../api/types.ts';

export type StorageChat = Chat & {
    messages: Message[];
};

export type StorageChatsDict = Record<string, StorageChat>;
