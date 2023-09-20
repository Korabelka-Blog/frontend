import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './Slices/theme';
import navigationReducer from './Slices/navigation';
export default configureStore({
    reducer: {
        theme: themeReducer,
        navigation: navigationReducer,
    },
});
