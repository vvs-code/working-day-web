import type {FC} from 'react';
import {StorageContextProvider} from '../shared/storage/StorageContext.tsx';

import './style.css';
import {MessengerApp} from './MessengerApp.tsx';

export const MessengerAppWrapper: FC = () => (
    <StorageContextProvider>
        <MessengerApp />
    </StorageContextProvider>
);
