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
    childCategories?: ChildCategory[];
}

interface ChildCategory {
    id: string;
    name: string;
}

interface CategoriesState {
    categories: Category[];
    selectedSubcategories: Subcategory[];
    selectedChildCategories: ChildCategory[];
    loading: boolean;
    error: string | null;
}

const initialState: CategoriesState = {
    categories: [],
    selectedSubcategories: [],
    selectedChildCategories: [],
    loading: false,
    error: null,
};

export const fetchCategories = createAsyncThunk<Category[]>('categories/fetchCategories', async () => {
    const response = await axiosInstance.get<Category[]>('/categories');
    return response.data;
});

export const fetchSubcategories = createAsyncThunk('categories/fetchSubcategories', async (categoryId: string) => {
    const response = await axiosInstance.get<Subcategory[]>(`/categories/${categoryId}/subcategories`);
    return { categoryId, subcategories: response.data };
});

export const fetchChildCategories = createAsyncThunk(
    'categories/fetchChildCategories',
    async (subcategoryId: string) => {
        const response = await axiosInstance.get<ChildCategory[]>(`/subcategories/${subcategoryId}/childcategories`);
        return { subcategoryId, childCategories: response.data };
    }
);

export const createCategory = createAsyncThunk('categories/createCategory', async (category: Omit<Category, 'id'>) => {
    const response = await axiosInstance.post<Category>('/categories', category);
    return response.data;
});

export const createSubcategory = createAsyncThunk(
    'categories/createSubcategory',
    async ({ categoryId, subcategory }: { categoryId: string; subcategory: { name: string } }) => {
        const response = await axiosInstance.post(`/categories/${categoryId}/subcategories`, {
            name: subcategory.name,
            categoryId,
        });
        return { categoryId, subcategory: response.data };
    }
);

export const createChildCategory = createAsyncThunk(
    'categories/createChildCategory',
    async ({ subcategoryId, childCategory }: { subcategoryId: string; childCategory: Omit<ChildCategory, 'id'> }) => {
        const response = await axiosInstance.post<ChildCategory>(
            `/subcategories/${subcategoryId}/childCategories`,
            childCategory
        );
        return { subcategoryId, childCategory: response.data };
    }
);

export const updateCategory = createAsyncThunk('categories/updateCategory', async (category: Category) => {
    const response = await axiosInstance.put<Category>(`/categories/${category.id}`, category);
    return response.data;
});

export const updateSubcategory = createAsyncThunk(
    'categories/updateSubcategory',
    async ({ categoryId, subcategory }: { categoryId: string; subcategory: Subcategory }) => {
        const response = await axiosInstance.put<Subcategory>(
            `/categories/${categoryId}/subcategories/${subcategory.id}`,
            subcategory
        );
        return { categoryId, subcategory: response.data };
    }
);

export const updateChildCategory = createAsyncThunk(
    'categories/updateChildCategory',
    async ({ subcategoryId, childCategory }: { subcategoryId: string; childCategory: ChildCategory }) => {
        const response = await axiosInstance.put<ChildCategory>(
            `/subcategories/${subcategoryId}/childCategories/${childCategory.id}`,
            childCategory
        );
        return { subcategoryId, childCategory: response.data };
    }
);

export const deleteCategory = createAsyncThunk('categories/deleteCategory', async (categoryId: string) => {
    await axiosInstance.delete(`/categories/${categoryId}`);
    return categoryId;
});

export const deleteSubcategory = createAsyncThunk(
    'categories/deleteSubcategory',
    async ({ categoryId, subcategoryId }: { categoryId: string; subcategoryId: string }) => {
        await axiosInstance.delete(`/categories/${categoryId}/subcategories/${subcategoryId}`);
        return { categoryId, subcategoryId };
    }
);

export const deleteChildCategory = createAsyncThunk(
    'categories/deleteChildCategory',
    async ({ subcategoryId, childCategoryId }: { subcategoryId: string; childCategoryId: string }) => {
        await axiosInstance.delete(`/subcategories/${subcategoryId}/childCategories/${childCategoryId}`);
        return { subcategoryId, childCategoryId };
    }
);

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
                    state.selectedSubcategories = action.payload.subcategories;
                }
            )
            .addCase(
                fetchChildCategories.fulfilled,
                (state, action: PayloadAction<{ subcategoryId: string; childCategories: ChildCategory[] }>) => {
                    state.selectedChildCategories = action.payload.childCategories;
                }
            )
            .addCase(createCategory.fulfilled, (state, action: PayloadAction<Category>) => {
                state.categories.push(action.payload);
            })
            .addCase(
                createSubcategory.fulfilled,
                (state, action: PayloadAction<{ categoryId: string; subcategory: Subcategory }>) => {
                    const { categoryId, subcategory } = action.payload;
                    const category = state.categories.find(cat => cat.id === categoryId);
                    if (category) {
                        category.subcategories = [...(category.subcategories || []), subcategory];
                    }
                    state.selectedSubcategories.push(subcategory);
                }
            )
            .addCase(
                createChildCategory.fulfilled,
                (state, action: PayloadAction<{ subcategoryId: string; childCategory: ChildCategory }>) => {
                    const { subcategoryId, childCategory } = action.payload;
                    const subcategory = state.selectedSubcategories.find(sub => sub.id === subcategoryId);
                    if (subcategory) {
                        subcategory.childCategories = [...(subcategory.childCategories || []), childCategory];
                    }
                }
            )
            .addCase(updateCategory.fulfilled, (state, action: PayloadAction<Category>) => {
                const index = state.categories.findIndex(cat => cat.id === action.payload.id);
                if (index >= 0) {
                    state.categories[index] = action.payload;
                }
            })
            .addCase(
                updateSubcategory.fulfilled,
                (state, action: PayloadAction<{ categoryId: string; subcategory: Subcategory }>) => {
                    const { categoryId, subcategory } = action.payload;
                    const category = state.categories.find(cat => cat.id === categoryId);
                    if (category && category.subcategories) {
                        const subIndex = category.subcategories.findIndex(sub => sub.id === subcategory.id);
                        if (subIndex >= 0) {
                            category.subcategories[subIndex] = subcategory;
                        }
                    }
                }
            )
            .addCase(
                updateChildCategory.fulfilled,
                (state, action: PayloadAction<{ subcategoryId: string; childCategory: ChildCategory }>) => {
                    const { subcategoryId, childCategory } = action.payload;
                    const subcategory = state.selectedSubcategories.find(sub => sub.id === subcategoryId);
                    if (subcategory && subcategory.childCategories) {
                        const childIndex = subcategory.childCategories.findIndex(
                            child => child.id === childCategory.id
                        );
                        if (childIndex >= 0) {
                            subcategory.childCategories[childIndex] = childCategory;
                        }
                    }
                }
            )
            .addCase(deleteCategory.fulfilled, (state, action: PayloadAction<string>) => {
                state.categories = state.categories.filter(cat => cat.id !== action.payload);
            })
            .addCase(
                deleteSubcategory.fulfilled,
                (state, action: PayloadAction<{ categoryId: string; subcategoryId: string }>) => {
                    const { subcategoryId } = action.payload;
                    state.selectedSubcategories = state.selectedSubcategories.filter(sub => sub.id !== subcategoryId);
                }
            )
            .addCase(
                deleteChildCategory.fulfilled,
                (state, action: PayloadAction<{ subcategoryId: string; childCategoryId: string }>) => {
                    const { subcategoryId, childCategoryId } = action.payload;
                    const subcategory = state.selectedSubcategories.find(sub => sub.id === subcategoryId);
                    if (subcategory && subcategory.childCategories) {
                        subcategory.childCategories = subcategory.childCategories.filter(
                            child => child.id !== childCategoryId
                        );
                    }
                }
            );
    },
});

export default categoriesSlice.reducer;
