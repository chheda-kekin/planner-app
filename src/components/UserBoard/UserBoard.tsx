import React, { useState } from "react";
import TileIcon from "../../UI/TileIcon/TileIcon";
import Tasklist from "../Tasklist/Tasklist";

import Classes from "./UserBoard.module.css";
import { TaskStatus } from "../../constants";

import Modal from "../../UI/Modal";
import TaskForm from "../Tasklist/Task/TaskForm";
import TaskContextProvider from "../Tasklist/Task/TaskContextProvider";

const UserBoard: React.FC = () => {

    const [showModal, setShowModal] = useState(false);

    const displayModal = (): void => {
        setShowModal(true);
    }

    const closeModalHandler = (): void => {
        setShowModal(false);
    }

    return (
        <>
            {
                showModal && <Modal>
                    <TaskContextProvider>
                        <TaskForm onCloseModal={closeModalHandler} />
                    </TaskContextProvider>
                </Modal>
            }
            <div className={Classes.Userboard}>
                <div className={Classes.navigation}>
                    <TileIcon bgcolor="#bf0077">KC</TileIcon>
                    <div className={Classes.title}>Assigned to me</div>
                </div>
                <div className={Classes.All_lists}>
                    {Object.keys(TaskStatus).map((status) => {
                        return <Tasklist tasks={[]} displayAddTaskButton={false} displayModal={displayModal} key={status} status={status} />
                    })}
                </div>
            </div>
        </>
    );
}

export default UserBoard;