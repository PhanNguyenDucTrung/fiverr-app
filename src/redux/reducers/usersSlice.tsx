import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/api';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await axiosInstance.get('/users');
    return response.data;
});

export const deleteUser = createAsyncThunk('users/deleteUser', async (userId: string) => {
    await axiosInstance.delete(`/users/${userId}`);
    return userId;
});

interface UserState {
    users: any[];
    loading: boolean;
    error: string | null;
    lastFetched: number | null;
}

const initialState: UserState = {
    users: [],
    loading: false,
    error: null,
    lastFetched: null,
};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchUsers.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<any[]>) => {
                state.loading = false;
                state.users = action.payload;
                state.lastFetched = Date.now();
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || null;
            })
            .addCase(deleteUser.fulfilled, (state, action: PayloadAction<string>) => {
                state.users = state.users.filter(user => user.id !== action.payload);
            });
    },
});

export default usersSlice.reducer;
