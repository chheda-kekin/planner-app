import React, { useState, useContext } from "react";
import TaskPriorityIcon from "../../../../UI/TaskPriorityIcon/TaskPriorityIcon";
import { TaskPriority } from "../../../../constants";
import TaskContext from "../task-context";

import Classes from "./PriorityDropdown.module.css";

const PriorityDropdown: React.FC = () => {

    const [displayDrpDwn, setDisplayDrpDwn] = useState(false);

    const taskContext = useContext(TaskContext);


    const changePriorityHandler = (priority: string) => {
        taskContext.onTaskPriorityChange(priority);
        toggleDropdown();
    }

    const taskPriorityArr = Object.values(TaskPriority);

    const showDropdown = () => {
        if (displayDrpDwn) {
            return (
                <div className={Classes.prgrsDrpdwn}>
                    {taskPriorityArr.map(priority => {
                        return (
                            <div key={priority} onClick={(event: React.MouseEvent<HTMLDivElement>) => {changePriorityHandler(priority)}}>
                                <div>
                                    <TaskPriorityIcon priority={priority} /></div>
                                <div>{ priority }</div>
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
                        <TaskPriorityIcon priority={taskContext.taskPriority}  />
                    </div>
                    <div className={Classes.statusLabelDiv}>
                        {taskContext.taskPriority}
                    </div>
                </div>
                { showDropdown() }
            </div>
        </>
    )
}

export default PriorityDropdown;