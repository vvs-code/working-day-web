import {Add} from '@mui/icons-material';
import {IconButton} from '@mui/material';
import {type FC, type HTMLProps, useMemo} from 'react';
import {useNavigate} from 'react-router-dom';
import DialogCard from '../../entities/DialogCard/DialogCard.tsx';

import './style.css';
import type {StorageChatsDict} from '../../shared/storage/types.ts';
import {sortChats} from '../../shared/storage/utils.ts';

type Props = HTMLProps<HTMLDivElement> & {
    activeChatId?: string;
    chats: StorageChatsDict;
    loading?: boolean;
};

export const DialogList: FC<Props> = ({activeChatId, chats, loading}) => {
    const chatsList = useMemo(() => Object.entries(chats).sort((lhs, rhs) => sortChats(lhs[1], rhs[1])), [chats]);

    const navigate = useNavigate();

    return (
        <div className="dialog-list">
            <div className="dialog-list__header">
                <div>{loading ? 'Загружаем чаты...' : 'Чаты'}</div>
                <IconButton onClick={() => navigate('/messenger/create')}>
                    <Add />
                </IconButton>
            </div>
            <div className="dialog-list__chats">
                {chatsList.length
                    ? chatsList.map(([chatId, chat]) => (
                          <DialogCard key={chatId} chat={chat} active={activeChatId === chatId} />
                      ))
                    : !loading && <div className="dialog-list__no-chats">У вас пока нет диалогов</div>}
            </div>
        </div>
    );
};
