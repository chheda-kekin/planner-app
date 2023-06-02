import React from "react";
import {
    ArrowDown20Regular,
    ClockAlarm20Filled,
    Important20Filled,
    Circle20Filled
} from "@fluentui/react-icons"; 

import { TaskPriority } from "../../constants";

const TaskPriorityIcon: React.FC<{priority: string}> = ({priority}) => {

    const getPriorityIcon = () => {
        if(priority === TaskPriority.Urgent) { 
            return <ClockAlarm20Filled color="rgb(209, 52, 56)" />
        } else if(priority === TaskPriority.Low) {
            return <ArrowDown20Regular color="rgb(50, 126, 170)" />
        } else if(priority === TaskPriority.Important) {
            return <Important20Filled color="rgb(209, 52, 56)" />
        } else {
            return <Circle20Filled color="rgb(49, 132, 86)" />
        }
    }

    return (
        <>
            { getPriorityIcon() }
        </>
    )
}

export default TaskPriorityIcon;