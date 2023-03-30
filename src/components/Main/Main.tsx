import React from "react";
import { useSelector } from "react-redux";
import PlannerStore, { PlannerState } from "../../Store";

import { planActions } from "../../slices/plan-slice";
import PlanCard from "../PlanCard/PlanCard";
import Classes from "./Main.module.css";

const Main: React.FC = () => {

    const plans = useSelector((PlannerStore: PlannerState) => {
        return PlannerStore.plan;
    });
    
    return (
        <>
            <div className={Classes.main}>
                {plans.map(plan => {
                   return (<PlanCard key={plan} planName={plan} />) 
                })}
            </div>
        </>
    );
}

export default Main;