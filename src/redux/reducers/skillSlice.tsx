import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SkillState {
    skills: string[];
}

const initialState: SkillState = {
    skills: [],
};

const skillSlice = createSlice({
    name: 'skill',
    initialState,
    reducers: {
        addSkill: (state, action: PayloadAction<string>) => {
            state.skills.push(action.payload);
        },
        removeSkill: (state, action: PayloadAction<string>) => {
            state.skills = state.skills.filter(skill => skill !== action.payload);
        },
    },
});

export const { addSkill, removeSkill } = skillSlice.actions;
export default skillSlice.reducer;
