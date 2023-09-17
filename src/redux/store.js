import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './Slices/theme';
export default configureStore({
    reducer: {
        theme: themeReducer
    },
});
