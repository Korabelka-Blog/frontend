import { createSlice } from '@reduxjs/toolkit';

import data from './_posts.json';
import { IPost } from './types';
import { RootState } from '../store';

export interface postState {
    post: IPost | null;
    status: 'loading' | 'error' | 'loaded';
}

function getPost(id: number) {
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
});

export const selectPost = (state: RootState) => state.post.post;
export const selectStatusPost = (state: RootState) => state.post.status;

export const { setPost } = postSlice.actions;

export default postSlice.reducer;
