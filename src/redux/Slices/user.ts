import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { IUser } from './types';

import axios from '../../axios';
import { LoginFormValues } from '@/pages/Login/types';

export interface IUserAuth extends IUser {
    token: string;
}

export const fetchAuth = createAsyncThunk(
    '/auth/login',
    async (params: LoginFormValues) => {
        const { data }: { data: IUserAuth } = await axios.post('/auth/login', params);
        return data;
    }
);

export const fetchAuthMe = createAsyncThunk('/auth/me', async (token: string) => {
    const { data } = await axios.get('/auth/me', token);
    return data;
});

export interface userState {
    user: IUserAuth | null;
    status?: 'loading' | 'error' | 'loaded';
}

function auth() {
    const token = window.localStorage.getItem('token');
    if (token) {
        fetchAuthMe(token);
    }
    // const isAuthed = false;
    // if (isAuthed)
    //     return {
    //         email: 'temp2@mail.ru',
    //         _id: 123,
    //         fullName: 'Иванов Иван Иванович',
    //         createdAt: '2022-10-03T10:00:00.000Z',
    //         updatedAt: '2022-10-03T10:00:00.000Z',
    //         token: '123123',
    //         __v: 1,
    //     };
    // return null;
}

const initialState: userState = {
    user: null,
    // status: 'error',
};
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            console.log(state.user);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAuth.pending, (state) => {
            state.user = null;
            state.status = 'loading';
        });
        builder.addCase(fetchAuth.fulfilled, (state, action) => {
            state.user = action.payload;
            state.status = 'loaded';
            console.log(state.user);
        });
        builder.addCase(fetchAuth.rejected, (state) => {
            state.user = null;
            state.status = 'error';
        });
        builder.addCase(fetchAuthMe.pending, (state) => {
            state.user = null;
            state.status = 'loading';
        });
        builder.addCase(fetchAuthMe.fulfilled, (state, action) => {
            state.user = action.payload.userData;
            state.status = 'loaded';
        });
        builder.addCase(fetchAuthMe.rejected, (state) => {
            state.user = null;
            state.status = 'error';
        });
    },
});

export const { logout } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;

export const selectIsAuthed = (state: RootState) => {
    return state.user.user != null;
};

export default userSlice.reducer;
