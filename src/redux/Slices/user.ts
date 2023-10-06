import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { IPost, IUser } from './types';

export interface userState {
    userId: IUser['_id'] | null;
    status: 'loading' | 'error' | 'loaded';
}

function auth() {
    const isAuthed = true;
    if (isAuthed) return 123;
    return null;
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
