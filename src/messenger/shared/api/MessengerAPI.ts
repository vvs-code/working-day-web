import {addMonths, format} from 'date-fns';
import BaseAPI from './BaseAPI.ts';
import type {
    Chat,
    CreateChatRequest,
    Employee,
    ListAllRequest,
    ListAllResponse,
    ListChatsResponse,
    LoadRecentMessagesRequest,
    LoadRecentMessagesResponse,
    Message,
} from './types.ts';

export default class MessengerAPI extends BaseAPI {
    public static ListChats = () =>
        this.PreparedQuery<undefined, ListChatsResponse, Chat[]>({
            url: `/messenger/list-chats?employee_id=${this.GetLogin()}`,
            dataCallback: (data) => data.chats,
        });

    public static CreateChat = (data: CreateChatRequest) =>
        this.Mutation<CreateChatRequest>({
            url: '/messenger/create-chat',
            data: (() => {
                data.id_list.push(MessengerAPI.GetLogin());
                return data;
            })(),
        });

    public static LoadRecentMessages = (data: LoadRecentMessagesRequest) =>
        this.PreparedQuery<LoadRecentMessagesRequest, Message[] | null, Message[]>({
            url: '/messenger/recent-messages',
            dataCallback: (data) => data ?? [],
            data,
        });

    public static GetAllEmployees = () =>
        this.PreparedQuery<ListAllRequest, ListAllResponse, Employee[]>({
            url: '/attendance/list-all',
            data: {
                from: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss"),
                to: format(addMonths(new Date(), 1), "yyyy-MM-dd'T'HH:mm:ss"),
            },
            dataCallback: (data) => data.attendances.map((item) => item.employee),
        });
}
