import React, { useState, useContext } from "react";
import TaskStatusIcon from "../../../../UI/TaskStatusIcon/TaskStatusIcon";

import { TaskStatus } from "../../../../constants";
import TaskContext from "../task-context";

import Classes from "./ProgressDropdown.module.css";

const ProgressDropdown: React.FC = () => {

    const [displayDrpDwn, setDisplayDrpDwn] = useState(false);

    const taskContext = useContext(TaskContext);


    const changeStatusHandler = (status: string) => {
        taskContext.onTaskStatusChange(status);
        toggleDropdown();
    }

    const taskStatusArr = Object.keys(TaskStatus);

    const showDropdown = () => {
        if (displayDrpDwn) {
            return (
                <div className={Classes.prgrsDrpdwn}>
                    {taskStatusArr.map(status => {
                        return (
                            <div key={status} onClick={(event: React.MouseEvent<HTMLDivElement>) => {changeStatusHandler(status)}}>
                                <div><TaskStatusIcon status={status} /></div>
                                <div>{ status }</div>
                            </div>  
                        )
                    })}
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
                <div className={Classes.drpDwnFld} onClick={toggleDropdown}>
                    <div className={Classes.iconDiv}>
                        <TaskStatusIcon status={taskContext.taskStatus} />
                    </div>
                    <div className={Classes.statusLabelDiv}>
                        {taskContext.taskStatus}
                    </div>
                </div>
                {showDropdown()}
            </div>
        </>
    )
}

export default ProgressDropdown;