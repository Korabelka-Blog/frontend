import { createSlice } from '@reduxjs/toolkit';

export const navigationSlice = createSlice({
    name: 'navigation',
    initialState: {
        path: 0,
    },
    reducers: {
        setPath: (state, action) => {
            state.path = action.payload;
        },
    },
});
export const selectPath = (state) => state.navigation.path;
export const { setPath } = navigationSlice.actions;

export default navigationSlice.reducer;
