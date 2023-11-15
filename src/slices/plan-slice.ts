import { createSlice, configureStore } from "@reduxjs/toolkit";
import axios from "axios";
import { PayloadAction } from "@reduxjs/toolkit/dist/createAction";
import { Plan, baseUrl } from "../constants";

const initialPlanState: Plan[] = [];
const planSlice = createSlice<Plan[], { addPlan:(state: Plan[], action: PayloadAction<Plan>) => void, 
loadPlans: (state: Plan[], action: PayloadAction<Plan[]>) => void}>({
    name: "plan",
    initialState: initialPlanState,
    reducers: {
        addPlan: (state: Plan[], action: PayloadAction<Plan>) => {
            state.push(action.payload);
        },
        loadPlans: (state: Plan[], action: PayloadAction<Plan[]>) => {
            console.log('### loadPlans invoked', action.payload);
            action.payload.forEach(plan => state.push(plan));
        }
    }
});

export const getAllPlans = () => {

    const fetchPlans = async () => {
        try {
            const response = await axios.get(`${baseUrl}/plans`);
            const { data } = response;

            return data;
        } catch(err) {
            throw err;
        }
    }

    return async (dispatch: any) => {
        try {
            const plans: Array<any> = await fetchPlans();
            const plansArr = plans.map(plan => ({ ...plan, name: plan.planName}));
            dispatch(planSlice.actions.loadPlans(plansArr));
        } catch(err) {
            
        }
    }
}

export const planActions = planSlice.actions;
export default planSlice;