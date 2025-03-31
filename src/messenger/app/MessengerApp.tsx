import {type FC, useContext} from 'react';
import {useParams} from 'react-router-dom';
import LeftPanel from '../../components/LeftPanel/LeftPanel.js';
import {StorageContext, StorageContextProvider} from '../shared/storage/StorageContext.tsx';
import {CreateForm} from '../widgets/CreateForm/CreateForm.tsx';
import {DialogFrame} from '../widgets/DialogFrame/DialogFrame.tsx';
import {DialogList} from '../widgets/DialogList/DialogList.tsx';

import './style.css';

export const MessengerApp: FC = () => {
    const activeChatId: string | undefined = useParams().dialogId;

    const {chats, chatsLoading} = useContext(StorageContext);

    console.log(chats, chatsLoading);

    return (
        <div className="messenger-app">
            <LeftPanel highlight="messenger" />
            <div className="messenger-app__wrapper">
                <div className="messenger-app__sidebar">
                    <DialogList activeChatId={activeChatId} chats={chats} loading={chatsLoading} />
                </div>
                {!activeChatId ? (
                    <div className="messenger-app__content">Выберите чат</div>
                ) : activeChatId === 'create' ? (
                    <CreateForm />
                ) : (
                    <DialogFrame chatId={activeChatId} />
                )}
            </div>
        </div>
    );
};
