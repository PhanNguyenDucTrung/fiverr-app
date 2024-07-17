import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/api';

interface Category {
    id: string;
    name: string;
    subcategories?: Subcategory[];
}

interface Subcategory {
    id: string;
    name: string;
}

interface CategoriesState {
    categories: Category[];
    loading: boolean;
    error: string | null;
}

const initialState: CategoriesState = {
    categories: [],
    loading: false,
    error: null,
};

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
    const response = await axiosInstance.get<Category[]>('/categories');
    return response.data;
});

export const fetchSubcategories = createAsyncThunk('categories/fetchSubcategories', async (categoryId: string) => {
    const response = await axiosInstance.get<Category>(`/categories/${categoryId}`);
    return { categoryId, subcategories: response.data.subcategories || [] };
});

export const updateCategory = createAsyncThunk('categories/updateCategory', async (category: Category) => {
    const response = await axiosInstance.put(`/categories/${category.id}`, category);
    return response.data;
});

export const createCategory = createAsyncThunk('categories/createCategory', async (category: Omit<Category, 'id'>) => {
    const response = await axiosInstance.post('/categories', category);
    return response.data;
});

export const deleteCategory = createAsyncThunk('categories/deleteCategory', async (categoryId: string) => {
    await axiosInstance.delete(`/categories/${categoryId}`);
    return categoryId;
});

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchCategories.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<Category[]>) => {
                state.loading = false;
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || null;
            })
            .addCase(
                fetchSubcategories.fulfilled,
                (state, action: PayloadAction<{ categoryId: string; subcategories: Subcategory[] }>) => {
                    const category = state.categories.find(cat => cat.id === action.payload.categoryId);
                    if (category) {
                        category.subcategories = action.payload.subcategories;
                    }
                }
            )
            .addCase(updateCategory.fulfilled, (state, action: PayloadAction<Category>) => {
                const index = state.categories.findIndex(cat => cat.id === action.payload.id);
                if (index >= 0) {
                    state.categories[index] = action.payload;
                }
            })
            .addCase(createCategory.fulfilled, (state, action: PayloadAction<Category>) => {
                state.categories.push(action.payload);
            })
            .addCase(deleteCategory.fulfilled, (state, action: PayloadAction<string>) => {
                state.categories = state.categories.filter(cat => cat.id !== action.payload);
            });
    },
});

export default categoriesSlice.reducer;
