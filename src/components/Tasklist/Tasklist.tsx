import React, { useState } from "react";

import Task from "./Task/Task";
import AddTaskButton from "../PlanTaskboard/AddTaskButton/AddTaskButton";
import NewTask from "./Task/NewTask/NewTask";

import Classes from "./Tasklist.module.css";


const Tasklist: React.FC<{ status: string, displayAddTaskButton: boolean, displayModal: () => void }> = (props) => {
    
    const [addNewTask, setAddNewTask] = useState(false);
    
    const onAddTaskListener = () => {
        setAddNewTask(prevVal => !prevVal);
    }
    
    return (
        <>
            <div className={Classes.taskList}>
                <div className={Classes.columnHeader}>
                    <div className={Classes.listTitle}>
                        {props.status}
                    </div>
                </div>
                <div className={Classes.scrollable}>
                    <div className={Classes.taskGrp}>
                        {props.displayAddTaskButton && <AddTaskButton addTaskHandler={onAddTaskListener} />}
                        <div id="newTaskDiv"></div>
                        <Task displayModal={props.displayModal} />
                        {(props.displayAddTaskButton && addNewTask) && <NewTask />}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Tasklist;