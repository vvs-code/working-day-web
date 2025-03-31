import type {StorageChat} from './types.ts';

export function sortChats(lhs: StorageChat, rhs: StorageChat): number {
    if (lhs.last_message.timestamp === rhs.last_message.timestamp) {
        return 0;
    }

    return lhs.last_message.timestamp < rhs.last_message.timestamp ? 1 : -1;
}
