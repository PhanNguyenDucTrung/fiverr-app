import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
import axiosInstance from '../../utils/api';

type CongViecState = {
    congViecs: string[];
};

const initialState: CongViecState = {
    congViecs: [],
};

const congViecSlice = createSlice({
    name: 'congViec',
    initialState,
    reducers: {
        addCongViec: (state, action: PayloadAction<string>) => {
            state.congViecs.push(action.payload);
        },
        removeCongViec: (state, action: PayloadAction<string>) => {
            state.congViecs = state.congViecs.filter(congViec => congViec !== action.payload);
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchCongViecByTen.pending, state => {
                state.status = 'loading';
            })
            .addCase(fetchCongViecByTen.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // If the response was successful and the status code is 200, the data will be in the payload
                console.log(action.payload);
                state.congViecs = action.payload;
            })
            .addCase(fetchCongViecByTen.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const fetchCongViecByTen = createAsyncThunk('congViec/fetchByTen', async (TenCongViec: string) => {
    const response = await axiosInstance.get(`/cong-viec/lay-danh-sach-cong-viec-theo-ten/${TenCongViec}`);
    return response.data;
});

export const { addCongViec, removeCongViec } = congViecSlice.actions;

export default congViecSlice.reducer;
