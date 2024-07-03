import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';

interface AuthState {
    token: string | null;
    role: string | null;
}

const initialState: AuthState = {
    token: localStorage.getItem('token'),
    role: null,
};

if (initialState.token) {
    const decodedToken: any = jwtDecode(initialState.token);
    initialState.role = decodedToken.role;
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
            localStorage.setItem('token', action.payload);
            const decodedToken: any = jwtDecode(action.payload);
            console.log(decodedToken);
            state.role = decodedToken.role;
        },
        clearToken: state => {
            state.token = null;
            state.role = null;
            localStorage.removeItem('token');
        },
    },
});

export const { setToken, clearToken } = authSlice.actions;
export default authSlice.reducer;
