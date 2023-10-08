import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axios from '../../axios';

import data from './_posts.json';
import { IPost, IUser } from './types';
import { RootState } from '../store';

interface IRes extends IPost {
    posts: IPost[];
    user: IUser;
}

export const deletePostFetch = createAsyncThunk(
    '/posts/delete',
    async (postId: string) => {
        const { data } = await axios.delete(`/posts/${postId}`);
        return { data, postId };
    }
);

export const getPosts = createAsyncThunk(`/profile/`, async (userId: string) => {
    const { data }: { data: IRes } = await axios.get(`/profile/${userId}`);
    return data;
});

const getUser = (userId: string): IUser | null => {
    const user: IUser | undefined = data.find((item) => item.user._id === userId)?.user;
    if (user !== undefined) {
        return user;
    }
    return null;
};
export interface profileState {
    user: IUser | null;
    posts: IPost[] | null;
    status: 'loading' | 'error' | 'loaded';
    statusDelete: 'loading' | 'error' | 'loaded';
}
const initialState: profileState = {
    user: null,
    posts: null,
    status: 'loaded',
    statusDelete: 'loaded',
};
export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setUserProfile: (state, action) => {
            state.user = getUser(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getPosts.pending, (state) => {
            state.posts = null;
            state.user = null;
            state.status = 'loading';
        });
        builder.addCase(getPosts.fulfilled, (state, action) => {
            state.posts = action.payload.posts;
            state.user = action.payload.user;
            state.status = 'loaded';
            console.log(state.posts);
        });
        builder.addCase(getPosts.rejected, (state) => {
            state.posts = null;
            state.user = null;
            state.status = 'error';
        });
        builder.addCase(deletePostFetch.pending, (state) => {
            state.statusDelete = 'loading';
        });
        builder.addCase(deletePostFetch.fulfilled, (state, action) => {
            state.statusDelete = 'loaded';
            const deletedPostId = action.payload.postId;
            state.posts =
                state.posts !== null
                    ? state.posts.filter((item) => item._id !== deletedPostId)
                    : [];
        });
        builder.addCase(deletePostFetch.rejected, (state) => {
            state.statusDelete = 'error';
        });
    },
});

export const selectProfilePosts = (state: RootState) => state.profile.posts;
export const selectStatusProfile = (state: RootState) => state.profile.status;
export const selectUserProfile = (state: RootState) => state.profile.user;
export const selectDeleteStatus = (state: RootState) => state.profile.statusDelete;

export const { setUserProfile } = profileSlice.actions;

export default profileSlice.reducer;
