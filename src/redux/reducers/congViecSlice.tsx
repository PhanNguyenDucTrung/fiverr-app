import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCategoriesMenu = createAsyncThunk('congViec/fetchCategoriesMenu', async () => {
    const response = await axios.get('http://localhost:3000/api/categories');
    return response.data;
});

export const fetchSubcategories = createAsyncThunk('congViec/fetchSubcategories', async (categoryId: string) => {
    const response = await axios.get(`http://localhost:3000/api/categories/${categoryId}`);
    console.log('Reach', response.data);
    return response.data;
});

const congViecSlice = createSlice({
    name: 'congViec',
    initialState: {
        categoryDetails: null,
        categoriesMenu: [],
        congViecs: [],
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
