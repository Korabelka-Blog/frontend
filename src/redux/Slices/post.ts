import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import data from './_posts.json';
import { IPost } from './types';
import { RootState } from '../store';
import axios from '../../axios';

export interface postState {
    post: IPost | null;
    status: 'loading' | 'error' | 'loaded';
}

export const fetchPost = createAsyncThunk('/posts/:id', async (id: string) => {
    const { data }: { data: IPost } = await axios.get(`/post/${id}`);
    return data;
});

function getPost(id: string) {
    const post: IPost | undefined = data.find((item: IPost) => item._id === id);
    if (post) {
        return post;
    }
    return null;
}

const initialState: postState = {
    post: null,
    status: 'loaded',
};
export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        setPost: (state, action) => {
            state.post = getPost(action.payload);
            if (state.post) {
                state.status = 'loaded';
            } else {
                state.status = 'error';
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPost.pending, (state) => {
            state.status = 'loading';
            state.post = null;
        });
        builder.addCase(fetchPost.fulfilled, (state, action) => {
            state.post = action.payload;
            console.log(state.post);
            state.status = 'loaded';
        });
        builder.addCase(fetchPost.rejected, (state) => {
            state.status = 'error';
            state.post = null;
        });
    },
});

export const selectPost = (state: RootState) => state.post.post;
export const selectStatusPost = (state: RootState) => state.post.status;

export const { setPost } = postSlice.actions;

export default postSlice.reducer;
