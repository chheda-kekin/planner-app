import React from "react";
import {
    Circle20Regular, CircleHalfFill20Regular,
    CheckmarkCircle20Filled
} from "@fluentui/react-icons";

const TaskStatusIcon: React.FC<{status: string}> = ({status}) => {

    const getIcon = () => {
        if(status === "In Progress") {
            return <CircleHalfFill20Regular color='rgb(33, 115, 70)' />
        } else if(status === "Not Started") {
            return <Circle20Regular color='rgb(50, 49, 48)' />
        } else {
            return <CheckmarkCircle20Filled color='rgb(33, 115, 70)' />
        }
    }

    return (
        <>
            { getIcon() }
        </>
    )
}

export default TaskStatusIcon;