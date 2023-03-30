import { createSlice, configureStore } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit/dist/createAction";

const planSlice = createSlice<string[], { addPlan:(state: string[], action: PayloadAction<string>) => void}>({
    name: "plan",
    initialState: ["Learn ReactJS", "Becoming TS Pro"],
    reducers: {
        addPlan: (state: string[], action: PayloadAction<string>) => {
            state.push(action.payload);
        }
    }
});


export const planActions = planSlice.actions;
export default planSlice;