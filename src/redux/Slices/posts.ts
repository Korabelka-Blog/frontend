import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { IPost } from './types';
import { RootState } from '../store';

import axios from '../../axios';

export interface postsState {
    posts: IPost[];
    status: 'loading' | 'error' | 'loaded';
}

export const fetchAllPosts = createAsyncThunk('/posts', async () => {
    const { data } = await axios.get('/posts');
    return data;
});

const initialState: postsState = {
    posts: [],
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
    extraReducers: (builder) => {
        builder.addCase(fetchAllPosts.pending, (state) => {
            state.status = 'loading';
            state.posts = [];
        });
        builder.addCase(fetchAllPosts.fulfilled, (state, action) => {
            state.posts = action.payload;
            state.status = 'loaded';
        });
        builder.addCase(fetchAllPosts.rejected, (state) => {
            state.status = 'error';
            state.posts = [];
        });
    },
});

export const selectPosts = (state: RootState) => state.posts.posts;
export const selectStatusPosts = (state: RootState) => state.posts.status;

export const { setStatus } = postsSlice.actions;

export default postsSlice.reducer;
