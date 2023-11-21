import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { PlannerState } from "../../Store";
// import Modal from "../../UI/Modal";
import Modal from '@mui/material/Modal';
import Classes from "./Sidebar.module.css";
import NewPlan from "../NewPlan/NewPlan";
import { useNavigate } from "react-router-dom";
import { initializeIcons } from "@fluentui/react";

import { Add24Regular, Home24Regular, Person24Regular, 
    ChevronRight12Filled, ChevronDown12Filled } from "@fluentui/react-icons";
initializeIcons();

const Sidebar: React.FC = () => {

    const navigate = useNavigate();

    const [isExpanded, setIsExpanded] = useState(false);

    const plans = useSelector((state: PlannerState) => {
        return state.plans;
    });

    useEffect(() => {
    }, [plans]);

    const [showNewPlanModal, setShowNewPlanModal] = useState(false);

    function addNewPlanHandler() {
        setShowNewPlanModal(true);
    }

    function closeModalHandler() {
        setShowNewPlanModal(false);
    }

    function getEmptyPlansList() {
        return plans.filter(plan => (plan.notStarted + plan.inProgress + plan.completed === 0))
            .map(plan => (
                    <div className={Classes.emptyPlans} key={plan.id} onClick={() => navigate(`planboard/${plan.id}`)}>
                        { plan.name }
                    </div>));
    }

    return (
        <>
            {showNewPlanModal && <Modal open={showNewPlanModal} onClose={closeModalHandler}>
                <NewPlan onCloseModal={closeModalHandler} />
                </Modal>}
            <div className={Classes.Sidebar}>
                <div className={Classes.Sidebar_items} onClick={addNewPlanHandler}>
                    <div className="Sidebar_icon">
                        <Add24Regular color="rgb(49, 132, 86)" />
                        {/* <AddIcon fontSize="small" className={Classes.matIcon} /> */}
                    </div>&nbsp;&nbsp;
                    <div>New Plan</div>
                </div>
                
                <div className={Classes.Sidebar_items} onClick={() => navigate("planhub")}>
                    <div className="Sidebar_icon">
                        <Home24Regular color="rgb(49, 132, 86)" />
                    </div>&nbsp;&nbsp;
                    <div>Hub</div>        
                </div>
                <div className={Classes.Sidebar_items} onClick={() => navigate("userboard")}>
                    <div className="Sidebar_icon">
                        <Person24Regular color="rgb(49, 132, 86)" />
                    </div>&nbsp;&nbsp;
                    <div>Assigned to Me</div>
                </div>
                {/* Emply plans list */}
                <div className={Classes.plansWrapper}>
                    <div className={Classes.plansDiv} onClick={() => setIsExpanded(current => !current)}>
                        <div style={{marginRight: '5px'}}>
                            { isExpanded? <ChevronDown12Filled /> : <ChevronRight12Filled /> }
                        </div>
                        <div>Plans</div>
                    </div>
                    { isExpanded && getEmptyPlansList() }
                </div>
                {/* Empty plans list ends */}
            </div>
        </>
    );
}

export default Sidebar;