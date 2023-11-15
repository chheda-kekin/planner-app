import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { PlannerState } from "../../Store";
import PlanCard from "../PlanCard/PlanCard";
import { Plan } from "../../constants";
import Classes from "./Main.module.css";
import { baseUrl } from "../../constants";

const Main: React.FC = () => {

    let nonEmptyPlans: Plan[] = [];

    const plans = useSelector((state: PlannerState) => {
        return state.plans;
    });

    useEffect(() => {
        console.log('### All Plans', plans);
        nonEmptyPlans = plans.filter(plan => {
            return plan.notStarted + plan.inProgress + plan.completed > 0
        });

        console.log('### Non Empty Plans', nonEmptyPlans);
    }, [plans]);

    return (
        <>
            <div className={Classes.main}>
                { plans.filter(plan => {
                    return plan.notStarted + plan.inProgress + plan.completed > 0
        }).map((plan: any) => {
                    const { id, planName, notStarted, inProgress, completed, due } = plan;
                    return (<PlanCard key={id} planName={planName} notStarted={notStarted} inProgress={inProgress} completed={completed} due={due} />)
                }) }
            </div>
        </>
    );
}

export default Main;