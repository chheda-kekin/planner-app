import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { PlannerState } from "../../Store";
import PlanCard from "../PlanCard/PlanCard";
import { Plan } from "../../constants";
import Classes from "./Main.module.css";

const Main: React.FC = () => {

    let nonEmptyPlans: Plan[] = [];

    const plans = useSelector((state: PlannerState) => {
        return state.plans;
    });

    useEffect(() => {
        nonEmptyPlans = plans.filter(plan => {
            return plan.notStarted + plan.inProgress + plan.completed > 0
        });
    }, [plans]);

    return (
        <>
            <div className={Classes.main}>
                { plans.filter(plan => plan.notStarted + plan.inProgress + plan.completed > 0)
                        .map((plan: any) => {
                                const { id, planName, notStarted, inProgress, completed, due } = plan;
                                return (<PlanCard key={id} id={id} planName={planName} notStarted={notStarted} inProgress={inProgress} completed={completed} due={due} />)
                }) }
            </div>
        </>
    );
}

export default Main;