import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the initial state interface
interface BinhLuanState {
    // Define your initial state properties here
}

// Define the initial state
const initialState: BinhLuanState = {
    // Set your initial state values here
};

// Create the slice
const binhLuanSlice = createSlice({
    name: 'binhLuan',
    initialState,
    reducers: {
        // Define your reducer actions here
    },
});

// Export the actions
export const {} = binhLuanSlice.actions;

// Export the reducer
export default binhLuanSlice.reducer;
