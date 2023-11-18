import React from "react";
import { useParams } from "react-router-dom";
import { TaskStatus } from "../../constants";
import Tasklist from "../Tasklist/Tasklist";
import AddTaskButton from "./AddTaskButton/AddTaskButton";
import Classes from "./PlanTaskboard.module.css";

const PlanTaskboard: React.FC = () => {

    
    const { id } = useParams();
    
    const displayModal = (): void => {
        // setShowModal(true);
    }

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
                            <Tasklist  displayAddTaskButton={true} displayModal={displayModal} key={status} status={status} />
                        </>
                    )
                    })}
                </div>
            </div>
    </>)
}

export default PlanTaskboard;