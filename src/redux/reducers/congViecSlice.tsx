// congViecSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/api';

// Thunk to fetch categories menu
export const fetchCategoriesMenu = createAsyncThunk('congViec/fetchCategoriesMenu', async () => {
    const response = await axiosInstance.get('/categories');

    return response.data;
});

// Thunk to fetch subcategories based on categoryId
export const fetchSubcategories = createAsyncThunk('congViec/fetchSubcategories', async (categoryId: string) => {
    const response = await axiosInstance.get(`/categories/${categoryId}`);
    return response.data;
});

const congViecSlice = createSlice({
    name: 'congViec',
    initialState: {
        categoryDetails: null,
        categoriesMenu: [],
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchSubcategories.fulfilled, (state, action) => {
            state.categoryDetails = action.payload;
        });
        builder.addCase(fetchCategoriesMenu.fulfilled, (state, action) => {
            state.categoriesMenu = action.payload;
        });
    },
});

export default congViecSlice.reducer;
