import { createSlice, configureStore } from "@reduxjs/toolkit";
import axios from "axios";
import { PayloadAction } from "@reduxjs/toolkit/dist/createAction";
import { Plan, baseUrl } from "../constants";

const initialPlanState: Plan[] = [];
type EnteredPlanType = Omit<Plan, "id">;
const planSlice = createSlice<Plan[], { addPlan:(state: Plan[], action: PayloadAction<Plan>) => void, 
loadPlans: (state: Plan[], action: PayloadAction<Plan[]>) => void}>({
    name: "plan",
    initialState: initialPlanState,
    reducers: {
        addPlan: (state: Plan[], action: PayloadAction<Plan>) => {
            console.log('### addPlan payload', action.payload);
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

export const savePlan = (plan: Plan) => {

    const invokeSavePlan = async (plan: Plan) => {
        try {
            const response = await axios.post(`${baseUrl}/plans/add`, plan);
            const { data } = response;

            return data;
        } catch(err) {
            throw err;
        }
        
    }

    return async (dispatch: any) => {
        try {
            await invokeSavePlan(plan);
            dispatch(planSlice.actions.addPlan(plan));
        } catch(err) {
            console.log('## Saveplan Error', err);
        }
        
    }
}

export const planActions = planSlice.actions;
export default planSlice;