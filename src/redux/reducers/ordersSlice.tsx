import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/api';

interface Order {
    id: string;
    service: {
        title: string;
        description: string;
    };
    buyer: {
        username: string;
    };
    seller: {
        username: string;
    };
    price: number;
    deliveryDate: string;
    status: string;
}

interface OrdersState {
    orders: Order[];
    loading: boolean;
    error: string | null;
}

const initialState: OrdersState = {
    orders: [],
    loading: false,
    error: null,
};

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
    const response = await axiosInstance.get<Order[]>('/orders');
    return response.data;
});

export const createOrder = createAsyncThunk('orders/createOrder', async (order: Omit<Order, 'id'>) => {
    const response = await axiosInstance.post<Order>('/orders', order);
    return response.data;
});

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchOrders.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrders.fulfilled, (state, action: PayloadAction<Order[]>) => {
                state.loading = false;
                state.orders = action.payload;
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || null;
            })
            .addCase(createOrder.fulfilled, (state, action: PayloadAction<Order>) => {
                state.orders.push(action.payload);
            });
    },
});

export default ordersSlice.reducer;
