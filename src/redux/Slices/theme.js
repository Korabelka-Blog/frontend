import { createSlice } from '@reduxjs/toolkit';

export const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        theme: 'dark', // 'light' | 'dark'
    },
    reducers: {
        setTheme: (state) => {
            if (state.theme === 'dark') {
                state.theme = 'light';
            } else {
                state.theme = 'dark';
            }
        },
    },
});
export const selectTheme = (state) => state.theme.theme;
export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;
