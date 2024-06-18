import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/api';

type CongViec = {
    id: number;
    congViec: {
        id: number;
        tenCongViec: string;
        danhGia: number;
        giaTien: number;
        nguoiTao: number;
        hinhAnh: string;
        moTa: string;
        maChiTietLoaiCongViec: number;
        moTaNgan: string;
        saoCongViec: number;
    };
    tenLoaiCongViec: string;
    tenNhomChiTietLoai: string;
    tenChiTietLoai: string;
    tenNguoiTao: string;
    avatar: string;
};

type CongViecs = CongViec[];

type CongViecState = {
    congViecs: CongViecs;
    menuLoaiCongViec: [];
    chiTietLoaiCongViec: null | {
        id: number;
        tenLoaiCongViec: string;
        dsNhomChiTietLoai: [];
    };
};

const initialState: CongViecState = {
    congViecs: [],
    menuLoaiCongViec: [],
    chiTietLoaiCongViec: null,
};

const congViecSlice = createSlice({
    name: 'congViec',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            // .addCase(fetchCongViecByTen.pending, state => {
            //     state.status = 'loading';
            // })
            .addCase(fetchCongViecByTen.fulfilled, (state, action) => {
                // state.status = 'succeeded';

                console.log(action.payload);
                state.congViecs = action.payload;
            })
            .addCase(fetchMenuLoaiCongViec.fulfilled, (state, action) => {
                state.menuLoaiCongViec = action.payload;
            })
            .addCase(fetchCongViecTheoChiTietLoai.fulfilled, (state, action) => {
                state.congViecs = action.payload;
            })
            .addCase(fetchChiTietLoaiCongViec.fulfilled, (state, action) => {
                state.chiTietLoaiCongViec = action.payload;
                console.log(action.payload);
            });
        // .addCase(fetchCongViecByTen.rejected, (state, action) => {
        //     state.status = 'failed';
        //     state.error = action.error.message;
        // });
    },
});

export const fetchCongViecByTen = createAsyncThunk('congViec/fetchByTen', async (TenCongViec: string) => {
    const response = await axiosInstance.get(`/cong-viec/lay-danh-sach-cong-viec-theo-ten/${TenCongViec}`);
    return response.data.content;
});

export const fetchMenuLoaiCongViec = createAsyncThunk('congViec/fetchMenuLoaiCongViec', async () => {
    const response = await axiosInstance.get('/cong-viec/lay-menu-loai-cong-viec');
    return response.data.content;
});

export const fetchCongViecTheoChiTietLoai = createAsyncThunk('congViec/fetchByChiTietLoai', async (id: number) => {
    const response = await axiosInstance.get(`/cong-viec/lay-cong-viec-theo-chi-tiet-loai/${id}`);
    return response.data.content;
});

export const fetchChiTietLoaiCongViec = createAsyncThunk('congViec/fetchChiTietLoaiCongViec', async (id: number) => {
    const response = await axiosInstance.get(`/cong-viec/lay-chi-tiet-loai-cong-viec/${id}`);
    console.log(response.data.content);
    return response.data.content[0];
});

// export const { } = congViecSlice.actions;

export default congViecSlice.reducer;
