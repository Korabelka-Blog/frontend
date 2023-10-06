import { createSlice } from '@reduxjs/toolkit';

import data from './_posts.json';
import { IPost, IUser } from './types';
import { RootState } from '../store';

export interface profileState {
    user: IUser | null;
    posts: IPost[] | null;
    status: 'loading' | 'error' | 'loaded';
}

function getPost(userId: number) {
    const posts: IPost[] | null = data.filter((item) => item.user._id === userId);
    if (posts) {
        return posts;
    }
    return null;
}

const getUser = (userId: number) => {
    const user: IUser | null = data.find((item) => item.user._id === userId);
    if (user) {
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
        setProfile: (state, action) => {
            state.posts = getPost(action.payload);
            if (state.posts) {
                state.status = 'loaded';
            } else {
                state.status = 'error';
            }
        },
        setUserProfile: (state, action) => {
            state.user = getUser(action.payload);
        },
    },
});

export const selectProfilePosts = (state: RootState) => state.profile.posts;
export const selectStatusProfile = (state: RootState) => state.profile.status;

export const { setProfile, setUserProfile } = profileSlice.actions;

export default profileSlice.reducer;
