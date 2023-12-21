import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { PlannerState } from "../../Store";
import { baseUrl, TaskType } from "../../constants";
import { useParams } from "react-router-dom";
import { TaskStatus } from "../../constants";
import Tasklist from "../Tasklist/Tasklist";
import Classes from "./PlanTaskboard.module.css";
import axios from "axios";
import { Plan } from "../../constants";

const PlanTaskboard: React.FC = () => {
    
    const { id } = useParams();

    console.log('## Plan board loaded for id', id);

    const plans = useSelector((state: PlannerState) => state.plans);
    let selectedPlan: Plan | undefined;
    let notStartedTasks: number = 0
    let inProgressTasks: number = 0
    let completedTasks: number = 0


    if(id) {
        selectedPlan = plans.find(plan => plan.id === parseInt(id));

        if(selectedPlan) {
            notStartedTasks = selectedPlan.notStarted;
            inProgressTasks = selectedPlan.inProgress;
            completedTasks = selectedPlan.completed;
        }
    }

    const [tasks, setTasks] = useState<TaskType[]>([]);

    const allStatus = Object.keys(TaskStatus);

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

        // if((notStartedTasks + inProgressTasks + completedTasks) > 0 ) {
            fetchTasksByPlanId();
        // }

    }, [id, notStartedTasks, inProgressTasks, completedTasks]);

    return (
    <>
        <div className={Classes.taskboard}>
                <div className={Classes.allLists}>
                    {allStatus.map((status, index: number) => {
                        const uniqueKey = index + 1;
                        return (
                            <Tasklist
                                key={uniqueKey}
                                status={status} 
                                tasks={tasks.filter(task => task.status === status)} 
                                displayAddTaskButton={status.trim().toLowerCase() !== "completed"} />
                        )
                    })}
                </div>
            </div>
    </>)
}

export default PlanTaskboard;