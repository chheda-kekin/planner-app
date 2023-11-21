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

    }, []);
    
    const displayModal = (): void => {
        // setShowModal(true);
    }

    const getMembersLookup = (): Map<number, number> => {
        return tasks.reduce((acc: Map<number, number>, task) => {
            task.members.forEach(member => {
                acc.set(member.memberId, Math.floor(Math.random()*24));
            });
            return acc;
        }, new Map<number, number>());    
    }

    const personaColorCodes = getMembersLookup();

    return (
    <>
        <div className={Classes.taskboard}>
                {/* <div className={Classes.navigation}>
                    <TileIcon bgcolor="#bf0077">KC</TileIcon>
                    <div className={Classes.title}>Assigned to me</div>
                </div> */}
                <div className={Classes.allLists}>
                    {Object.keys(TaskStatus).map((status) => {
                        return (
                        <>
                            <Tasklist
                                key={status}
                                status={status} 
                                tasks={tasks.filter(task => task.status === status)} 
                                displayAddTaskButton={true} 
                                personaColorCodes={personaColorCodes} 
                                displayModal={displayModal} />
                        </>
                    )
                    })}
                </div>
            </div>
    </>)
}

export default PlanTaskboard;