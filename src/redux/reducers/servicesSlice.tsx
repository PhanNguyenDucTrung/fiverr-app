import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/api';

interface Service {
    id: string;
    title: string;
    description: string;
}

interface ServicesState {
    services: Service[];
    loading: boolean;
    error: string | null;
}

const initialState: ServicesState = {
    services: [],
    loading: false,
    error: null,
};

export const fetchServices = createAsyncThunk('services/fetchServices', async () => {
    const response = await axiosInstance.get<Service[]>('/services');
    return response.data;
});

export const createService = createAsyncThunk('services/createService', async (service: Omit<Service, 'id'>) => {
    const response = await axiosInstance.post<Service>('/services', service);
    return response.data;
});

const servicesSlice = createSlice({
    name: 'services',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchServices.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchServices.fulfilled, (state, action: PayloadAction<Service[]>) => {
                state.loading = false;
                state.services = action.payload;
            })
            .addCase(fetchServices.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || null;
            })
            .addCase(createService.fulfilled, (state, action: PayloadAction<Service>) => {
                state.services.push(action.payload);
            });
    },
});

export default servicesSlice.reducer;
