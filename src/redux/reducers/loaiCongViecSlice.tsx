import { createSlice } from '@reduxjs/toolkit';

interface LoaiCongViecState {
    // Define your state properties here
}

const initialState: LoaiCongViecState = {
    // Set initial state values here
};

const loaiCongViecSlice = createSlice({
    name: 'loaiCongViec',
    initialState,
    reducers: {
        // Define your reducer functions here
    },
});

export const { actions, reducer } = loaiCongViecSlice;
export default reducer;
