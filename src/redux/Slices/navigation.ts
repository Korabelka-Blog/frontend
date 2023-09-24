import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

type NavigationState = {
    path: number;
};

const initialState: NavigationState = {
    path: 0,
};

export const navigationSlice = createSlice({
    name: 'navigation',
    initialState,
    reducers: {
        setPath: (state, action: PayloadAction<number>) => {
            state.path = action.payload;
        },
    },
});
export const selectPath = (state: RootState) => state.navigation.path;
export const { setPath } = navigationSlice.actions;

export default navigationSlice.reducer;
