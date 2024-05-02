import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the initial state interface
interface NguoiDungState {
    // Define your initial state properties here
}

// Define the initial state
const initialState: NguoiDungState = {
    // Set your initial state values here
};

// Create the slice
const nguoiDungSlice = createSlice({
    name: 'nguoiDung',
    initialState,
    reducers: {
        // Define your reducer actions here
    },
});

// Export the reducer and actions
export const { actions } = nguoiDungSlice;
export default nguoiDungSlice.reducer;
