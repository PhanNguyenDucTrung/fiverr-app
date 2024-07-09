import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';
import { Middleware } from 'redux';

interface AuthState {
    token: string | null;
    role: string | null;
    expiresAt: number | null;
}

const initialState: AuthState = {
    token: localStorage.getItem('token'),
    role: null,
    expiresAt: null,
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
            localStorage.removeItem('token');
        },
    },
});

// Middleware to check token expiration
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
