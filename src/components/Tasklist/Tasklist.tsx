import React from "react";

import Task from "./Task/Task";
import AddTaskButton from "../PlanTaskboard/AddTaskButton/AddTaskButton";

import Classes from "./Tasklist.module.css";

const Tasklist: React.FC<{ status: string, displayAddTaskButton: boolean, displayModal: () => void }> = (props) => {
    
    // const [newTask, AddNewTask] = useState();
    const onAddTaskListener = () => {
        console.log("Adding new task!!!");
        // const newTaskEle = document.getElementById('newTaskDiv');
        // newTaskEle?.appendChild(<Task displayModal={props.displayModal} />);
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
                    </div>
                </div>
            </div>
        </>
    );
}

export default Tasklist;