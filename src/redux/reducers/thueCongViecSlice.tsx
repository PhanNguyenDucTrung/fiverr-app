import { createSlice } from '@reduxjs/toolkit';

// Define the initial state interface
interface ThueCongViecState {
    // Define your initial state properties here
}

// Define the initial state
const initialState: ThueCongViecState = {
    // Set your initial state values here
};

// Create the slice
const thueCongViecSlice = createSlice({
    name: 'thueCongViec',
    initialState,
    reducers: {
        // Define your reducer actions here
    },
});

// Export the reducer and actions
export const { actions: thueCongViecActions } = thueCongViecSlice;
export default thueCongViecSlice.reducer;
