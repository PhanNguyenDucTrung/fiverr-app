import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';
import { Middleware } from 'redux';
import axiosInstance from '../../utils/api';

interface AuthState {
    token: string | null;
    role: string | null;
    expiresAt: number | null;
    profile: any | null;
}

const initialState: AuthState = {
    token: localStorage.getItem('token'),
    role: null,
    expiresAt: null,
    profile: localStorage.getItem('profile') ? JSON.parse(localStorage.getItem('profile')!) : null,
};

if (initialState.token) {
    const decodedToken: any = jwtDecode(initialState.token);
    initialState.role = decodedToken.role;
    initialState.expiresAt = decodedToken.exp * 1000;
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
            localStorage.setItem('token', action.payload);
            const decodedToken: any = jwtDecode(action.payload);
            state.role = decodedToken.role;
            state.expiresAt = decodedToken.exp * 1000;
        },
        clearToken: state => {
            state.token = null;
            state.role = null;
            state.expiresAt = null;
            state.profile = null;
            localStorage.removeItem('token');
            localStorage.removeItem('profile');
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
            state.profile = action.payload;
            localStorage.setItem('profile', JSON.stringify(action.payload));
        });
    },
});

export const fetchUserProfile = createAsyncThunk('auth/fetchUserProfile', async () => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found');

    const response = await axiosInstance.get('/users/profile', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
});

// Middleware to check token expiration and fetch profile if null
export const tokenExpirationMiddleware: Middleware = storeAPI => next => action => {
    const result = next(action);

    const state: AuthState = storeAPI.getState().auth;
    if (state?.expiresAt && Date.now() >= state.expiresAt) {
        storeAPI.dispatch(authSlice.actions.clearToken());
    }

    return result;
};

export const { setToken, clearToken } = authSlice.actions;
export default authSlice.reducer;
