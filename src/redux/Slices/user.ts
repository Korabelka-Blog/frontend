import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface userState {
    userId: string;
    status: 'loading' | 'error' | 'loaded';
}

function auth() {
    return '123';
}

const initialState: userState = {
    userId: auth(),
    status: 'loaded',
};
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
});

export const selectUserId = (state: RootState) => state.user.userId;

export default userSlice.reducer;
