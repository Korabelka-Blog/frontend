import { configureStore } from '@reduxjs/toolkit';

import themeReducer from './Slices/theme';
import navigationReducer from './Slices/navigation';

export const store = configureStore({
    reducer: {
        theme: themeReducer,
        navigation: navigationReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
