import { createSlice } from '@reduxjs/toolkit';

// Define the initial state interface
interface AuthState {
    // Define your initial state properties here
}

// Define the initial state
const initialState: AuthState = {
    // Set your initial state values here
};

// Create the auth slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // Define your reducer actions here
    },
});

// Export the reducer and actions separately
export const {} = authSlice.actions;
export default authSlice.reducer;
