import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the initial state interface
interface ChiTietLoaiCongViecState {
    // Define your initial state properties here
}

// Define the initial state
const initialState: ChiTietLoaiCongViecState = {
    // Set your initial state values here
};

// Create the slice
const chiTietLoaiCongViecSlice = createSlice({
    name: 'chiTietLoaiCongViec',
    initialState,
    reducers: {
        // Define your reducer actions here
    },
});

// Export the reducer and actions
export const { actions: chiTietLoaiCongViecActions, reducer: chiTietLoaiCongViecReducer } = chiTietLoaiCongViecSlice;
export default chiTietLoaiCongViecSlice.reducer;
