import React, { useState } from "react";
import {
    Circle20Regular, CircleHalfFill20Regular,
    CheckmarkCircle20Filled
} from "@fluentui/react-icons";

import { TaskStatus } from "../../../../constants";

import Classes from "./ProgressDropdown.module.css";

const ProgressDropdown: React.FC = () => {

    const [displayDrpDwn, setDisplayDrpDwn] = useState(false);

    // const taskStatus = Object.keys(TaskStatus);

    const showDropdown = () => {
        if (displayDrpDwn) {
            return (
                <div className={Classes.prgrsDrpdwn}>
                    <div>
                        <div><Circle20Regular color='rgb(50, 49, 48)' /></div>
                        <div>Not Started</div>
                    </div>
                    <div>
                        <div><CircleHalfFill20Regular color='rgb(33, 115, 70)' /></div>
                        <div>In Progress</div>
                    </div>
                    <div>
                        <div><CheckmarkCircle20Filled color='rgb(33, 115, 70)' /></div>
                        <div>Completed</div>
                    </div>
                </div>
            )
        } else {
            return null;
        }
    }

    const toggleDropdown = () => {
        setDisplayDrpDwn(prevVal => !prevVal);
    }

    return (
        <>
            <div className={Classes.drpDwnFldWrpr}>
                <div className={Classes.drpDwnFld} onClick={toggleDropdown}>In Progress</div>
                {/* <input type="text" className={Classes.drpDwnFld} onClick={toggleDropdown} /> */}
                {showDropdown()}
            </div>
        </>
    )
}

export default ProgressDropdown;