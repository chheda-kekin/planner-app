import React, { useState } from "react";
import Modal from "../../UI/Modal";
import Classes from "./Sidebar.module.css";
import NewPlan from "../NewPlan/NewPlan";
import { useNavigate } from "react-router-dom";
import { initializeIcons } from "@fluentui/react";

import { Add24Regular, Home24Regular, Person24Regular } from "@fluentui/react-icons";
initializeIcons();

const Sidebar: React.FC = () => {

    const navigate = useNavigate();

    const [showNewPlanModal, setShowNewPlanModal] = useState(false);

    function addNewPlanHandler() {
        setShowNewPlanModal(true);
    }

    function closeModalHandler() {
        setShowNewPlanModal(false);
    }

    return (
        <>
            {showNewPlanModal && <Modal><NewPlan onCloseModal={closeModalHandler} /></Modal>}
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
            </div>
        </>
    );
}

export default Sidebar;