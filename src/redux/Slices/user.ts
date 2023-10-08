import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { IUser } from './types';

import axios from '../../axios';
import { LoginFormValues } from '@/pages/Login/types';
import { RegistrationFormValues } from '@/pages/Registration/types';

export interface IUserAuth extends IUser {
    token: string;
}

export const loginAuth = createAsyncThunk(
    '/auth/login',
    async (params: LoginFormValues) => {
        const { data }: { data: IUserAuth } = await axios.post('/auth/login', params);
        return data;
    }
);

export const registerAuth = createAsyncThunk(
    '/auth/register',
    async (params: RegistrationFormValues) => {
        const { data }: { data: IUserAuth } = await axios.post('/auth/register', params);
        console.log(data)
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
        builder.addCase(loginAuth.pending, (state) => {
            state.user = null;
            state.status = 'loading';
        });
        builder.addCase(loginAuth.fulfilled, (state, action) => {
            state.user = action.payload;
            state.status = 'loaded';
            console.log(state.user);
        });
        builder.addCase(loginAuth.rejected, (state) => {
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
        builder.addCase(registerAuth.pending, (state) => {
            state.user = null;
            state.status = 'loading';
        });
        builder.addCase(registerAuth.fulfilled, (state, action) => {
            state.user = action.payload;
            state.status = 'loaded';
            console.log(state.user);
        });
        builder.addCase(registerAuth.rejected, (state) => {
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
