import React, { useState } from "react";

import Task from "./Task/Task";
import AddTaskButton from "../PlanTaskboard/AddTaskButton/AddTaskButton";
import NewTask from "./Task/NewTask/NewTask";
import { TaskType } from "../../constants";

import Classes from "./Tasklist.module.css";

type TaskListProps = { 
    status: string, 
    tasks: TaskType[], 
    displayAddTaskButton: boolean
};

const Tasklist: React.FC<TaskListProps> = (props) => {
    
    const [addNewTask, setAddNewTask] = useState(false);
    
    const onAddTaskListener = () => {
        setAddNewTask(prevVal => !prevVal);
    }

    const getTasks = () => {
        return props.tasks.map(task => {
            return (
                <Task id={task.id} 
                    key={task.id} 
                    name={task.name.trim()}
                    status={task.status.trim()}
                    planId={task.planId} 
                    planName={task.planName}
                    dueDate={task.due}
                    members={task.members}
                    labels={task.labels} />
            );
        })
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
                        <div id="newTaskDiv"></div>
                        { getTasks() }
                        {props.displayAddTaskButton && <AddTaskButton addTaskHandler={onAddTaskListener} />}
                        {(props.displayAddTaskButton && addNewTask) && <NewTask status={props.status} onAddNewTask={() => {setAddNewTask(false)}} />}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Tasklist;