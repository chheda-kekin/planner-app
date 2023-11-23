import React, { useState } from "react";

import Task from "./Task/Task";
import AddTaskButton from "../PlanTaskboard/AddTaskButton/AddTaskButton";
import NewTask from "./Task/NewTask/NewTask";
import { TaskType } from "../../constants";

import Classes from "./Tasklist.module.css";

type TaskListProps = { 
    status: string, 
    tasks: TaskType[], 
    displayAddTaskButton: boolean,
    personaColorCodes: Map<number, number> 
};

const Tasklist: React.FC<TaskListProps> = (props) => {
    
    const [addNewTask, setAddNewTask] = useState(false);
    
    const onAddTaskListener = () => {
        setAddNewTask(prevVal => !prevVal);
    }

    const getTasks = () => {
        console.log('### props.tasks', props.tasks);
        return props.tasks.map(task => {
            return (
                <Task id={task.id} 
                    key={task.id} 
                    name={task.name.trim()} 
                    planName={task.planName}
                    dueDate={task.due}
                    members={task.members}
                    labels={task.labels}
                    personaColorCodes={props.personaColorCodes} />
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
                        {props.displayAddTaskButton && <AddTaskButton addTaskHandler={onAddTaskListener} />}
                        <div id="newTaskDiv"></div>
                        { getTasks() }
                        {(props.displayAddTaskButton && addNewTask) && <NewTask />}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Tasklist;