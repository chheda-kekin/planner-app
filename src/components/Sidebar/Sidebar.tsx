import React, { useState } from "react";
import Modal from "../../UI/Modal";
import Classes from "./Sidebar.module.css";
import NewPlan from "../NewPlan/NewPlan";

import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';

import { NavLink, useNavigate } from "react-router-dom";

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
                    <div className="Sidebar_icon"><AddIcon fontSize="small" className={Classes.matIcon} /></div>&nbsp;&nbsp;
                    <div>New Plan</div>
                </div>
                
                <div className={Classes.Sidebar_items} onClick={() => navigate("planhub")}>
                    <div className="Sidebar_icon">
                        <HomeIcon fontSize="small" className={Classes.matIcon} /></div>&nbsp;&nbsp;
                        <div>Hub</div>        
                </div>
                <div className={Classes.Sidebar_items} onClick={() => navigate("userboard")}>
                    <div className="Sidebar_icon"><PersonIcon fontSize="small" className={Classes.matIcon} /></div>&nbsp;&nbsp;
                    <div>Assigned to Me</div>
                </div>
            </div>
        </>
    );
}

export default Sidebar;