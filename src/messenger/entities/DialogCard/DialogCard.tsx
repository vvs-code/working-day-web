import cx from 'classnames';
import type {FC} from 'react';
import {Link} from 'react-router-dom';
import type {Chat} from '../../shared/api/types.ts';

import './style.css';

type Props = {
    chat: Chat;
    active?: boolean;
};

export const DialogCard: FC<Props> = ({chat, active}) => {
    return (
        <Link to={`/messenger/${chat.chat_id}`} className={cx('dialog-card', active && 'active')}>
            <div className="dialog-card__avatar" style={{backgroundImage: 'url()'}}>
                {chat.chat_name?.toUpperCase()?.[0]}
            </div>
            <div className="dialog-card__content">
                <div className="dialog-card__name">{chat.chat_name}</div>
                <div className="dialog-card__message">{chat.last_message.content.content}</div>
            </div>
            {/*<div className="dialog-card__notification" hidden={!chat.unreadMessagesCount}>
                <div>{chat.unreadMessagesCount}</div>
            </div>*/}
        </Link>
    );
};

export default DialogCard;
