import React, { useState, useEffect } from "react";
import { baseUrl, TaskType } from "../../constants";
import { useParams } from "react-router-dom";
import { TaskStatus } from "../../constants";
import Tasklist from "../Tasklist/Tasklist";
import AddTaskButton from "./AddTaskButton/AddTaskButton";
import Classes from "./PlanTaskboard.module.css";
import axios from "axios";

const PlanTaskboard: React.FC = () => {

    
    const { id } = useParams();

    const [tasks, setTasks] = useState<TaskType[]>([]);

    useEffect(() => {
        const fetchTasksByPlanId = async () => {
            try {
                const url = `${baseUrl}/tasks/plan/${id}`;
                const { data } = await axios.get(url);
                setTasks(data);
            } catch(err) {
                throw err;
            }
        }

        fetchTasksByPlanId();

    }, [id]);

    return (
    <>
        <div className={Classes.taskboard}>
                <div className={Classes.allLists}>
                    {Object.keys(TaskStatus).map((status) => {
                        return (
                        <>
                            <Tasklist
                                key={status}
                                status={status} 
                                tasks={tasks.filter(task => task.status === status)} 
                                displayAddTaskButton={status.trim().toLowerCase() !== "completed"} />
                        </>
                    )
                    })}
                </div>
            </div>
    </>)
}

export default PlanTaskboard;