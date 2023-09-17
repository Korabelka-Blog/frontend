import { createSlice } from '@reduxjs/toolkit';

export const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        theme: 'light', // 'light' | 'dark'
    },
    reducers: {
        setThemeDark: (state) => {
            if (state.theme === 'dark') {
                state.theme = 'light';
            } else {
                state.theme = 'dark';
            }
        },
    },
});
export const selectTheme = (state) => state.theme.theme;
export const { setThemeDark } = themeSlice.actions;

export default themeSlice.reducer;
