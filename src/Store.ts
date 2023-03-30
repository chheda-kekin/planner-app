import { configureStore } from '@reduxjs/toolkit';
import planSlice from './slices/plan-slice';
import { useDispatch } from 'react-redux';


const PlannerStore = configureStore({
    reducer: {
        plan: planSlice.reducer
    }
});

export type PlannerDispatch = typeof PlannerStore.dispatch;
export const usePlannerDispatch: () => PlannerDispatch = useDispatch;
export type PlannerState = ReturnType<typeof PlannerStore.getState>;

export default PlannerStore;

