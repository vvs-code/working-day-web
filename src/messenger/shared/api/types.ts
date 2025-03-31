export type Message = {
    chat_id: string;
    sender_id: string;
    content: {
        content?: string;
    };
    timestamp: string;
};

export type Chat = {
    chat_id: string;
    chat_name: string;
    last_message: Message;
};

export type Employee = {
    id: string;
    name: string;
    surname: string;
    patronymic: string;
    subcompany: string;
};

export type ListChatsResponse = {
    chats: Chat[];
};

export type CreateChatRequest = {
    chat_name: string;
    id_list: string[];
};

export type LoadRecentMessagesRequest = {
    chat_id: string;
};

export type LoadRecentMessagesResponse = {
    messages: Message[];
};

export type ListAllRequest = {
    from: string;
    to: string;
};

export type ListAllResponse = {
    attendances: Array<{
        employee: Employee;
    }>;
};
