import React, { useRef } from "react";
import Classes from "./NewPlan.module.css";
import AppClasses from "../../App.module.css";
import { usePlannerDispatch } from "../../Store";
import { planActions } from "../../slices/plan-slice";
import { savePlan } from "../../slices/plan-slice";
import { Plan } from "../../constants";

const NewPlan: React.FC<{ onCloseModal: () => void }> = (props) => {

    const dispatchAction = usePlannerDispatch();

    const planInputRef = useRef<HTMLInputElement>(null);

    const savePlanHandler = () => {
        const enteredPlanName = planInputRef.current!.value;
        if (enteredPlanName === "") {
            return new Error("Plan name can't be empty");
        } else {
            let enteredPlan: Plan = {
                id: 0,
                name: enteredPlanName,
                notStarted: 0,
                inProgress: 0,
                completed: 0,
                due: 0
            }
            dispatchAction(savePlan(enteredPlan));
            props.onCloseModal();
        }
    }

    return (
        <>
            <div className={Classes.dialog}>
                <div className={Classes.dialogContent}>
                    <input type="text" ref={planInputRef} id="PlanName" className={Classes.PlanName} placeholder="Plan Name" />
                </div>
                <div className={Classes.dialog_footer}>
                    <button className={AppClasses.primaryBtn} onClick={savePlanHandler}>Save</button>
                    <button className={AppClasses.cancelBtn} onClick={props.onCloseModal}>Cancel</button>
                </div>
            </div>
        </>
    );
}

export default NewPlan;