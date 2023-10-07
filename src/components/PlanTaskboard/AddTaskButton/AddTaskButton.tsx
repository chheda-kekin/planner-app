import React from 'react';
import Classes from './AddTaskButton.module.css';
import { initializeIcons } from "@fluentui/react";
import { Add16Regular } from "@fluentui/react-icons";

initializeIcons();

const AddTaskButton: React.FC<{addTaskHandler: () => void}> = (props) => {
    return (
            <>
                <div className={Classes.addTaskBtn} onClick={props.addTaskHandler}>
                    <div className={Classes.addIcon}>
                        <Add16Regular color="rgb(49, 132, 86)" />
                    </div>
                    <div>Add Task</div>
                </div>
            </>
    )
}

export default AddTaskButton;