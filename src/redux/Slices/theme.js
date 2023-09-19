import { createSlice } from '@reduxjs/toolkit';
import { getTheme, setThemeToLocalStorage } from '../../utils/localStorage';

export const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        theme: getTheme(), // 'light' | 'dark'
    },
    reducers: {
        setTheme: (state) => {
            if (state.theme === 'dark') {
                state.theme = 'light';
            } else {
                state.theme = 'dark';
            }
            setThemeToLocalStorage(state.theme);
            console.log('theme changed');
        },
    },
});
export const selectTheme = (state) => state.theme.theme;
export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;
