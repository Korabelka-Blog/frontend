import { createSlice } from '@reduxjs/toolkit';

import data from './_posts.json';
import { IPost } from './types';
import { RootState } from '../store';

export interface postsState {
    posts: IPost[];
    status: 'loading' | 'error' | 'loaded';
}

function getPosts() {
    return data;
}

const initialState: postsState = {
    posts: getPosts(),
    status: 'loaded',
};
export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setStatus: (state, action) => {
            state.status = action.payload;
        },
    },
});

export const selectPosts = (state: RootState) => state.posts.posts;
export const selectStatusPosts = (state: RootState) => state.posts.status;

export const { setStatus } = postsSlice.actions;

export default postsSlice.reducer;
