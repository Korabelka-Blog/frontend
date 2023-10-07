import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axios from '../../axios';

import data from './_posts.json';
import { IPost, IUser } from './types';
import { RootState } from '../store';

interface IRes extends IPost {
    posts: IPost[];
    user: IUser;
}
export interface profileState {
    user: IUser | null;
    posts: IPost[] | null;
    status: 'loading' | 'error' | 'loaded';
}

export const getPosts = createAsyncThunk(`/profile/`, async (userId: string) => {
    const { data }: { data: IRes } = await axios.get(`/profile/${userId}`);
    return data;
});

function getPost(userId: string) {
    const posts: IPost[] | null = data.filter((item) => item.user._id === userId);
    if (posts) {
        return posts;
    }
    return null;
}

const getUser = (userId: string): IUser | null => {
    const user: IUser | undefined = data.find((item) => item.user._id === userId)?.user;
    if (user !== undefined) {
        return user;
    }
    return null;
};

const initialState: profileState = {
    user: null,
    posts: null,
    status: 'loaded',
};
export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        // setProfile: (state, action) => {
        //     state.posts = getPost(action.payload);
        //     if (state.posts) {
        //         state.status = 'loaded';
        //     } else {
        //         state.status = 'error';
        //     }
        // },
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
    },
});

export const selectProfilePosts = (state: RootState) => state.profile.posts;
export const selectStatusProfile = (state: RootState) => state.profile.status;
export const selectUserProfile = (state: RootState) => state.profile.user;

export const { setUserProfile } = profileSlice.actions;

export default profileSlice.reducer;
