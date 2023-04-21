import React, { useState, useEffect } from "react";
import TileIcon from "../../UI/TileIcon/TileIcon";
import Tasklist from "../Tasklist/Tasklist";

import Classes from "./UserBoard.module.css";
import { TaskStatus } from "../../constants";

import Modal from "../../UI/Modal";
import TaskForm from "../Tasklist/Task/TaskForm";

const UserBoard: React.FC = () => {

    const [showModal, setShowModal] = useState(false);

    const width = window.innerWidth;
    const height = window.innerHeight;

    useEffect(() => {
        console.log(`Width ${window.innerWidth} Height ${window.innerHeight}`);
    }, []);

    console.log("UserBoard component loaded!!!");

    const displayModal = (): void => {
        setShowModal(true);
    }

    const closeModalHandler = (): void => {
        setShowModal(false);
    }

    return (
        <>
            {showModal && <Modal overlayWidth={width} overlayHeight={height}><TaskForm onCloseModal={closeModalHandler} /></Modal>}
            <div className={Classes.Userboard}>
                <div className={Classes.navigation}>
                    <TileIcon bgcolor="#bf0077">KC</TileIcon>
                    <div className={Classes.title}>Assigned to me</div>
                </div>
                <div className={Classes.All_lists}>
                    {Object.values(TaskStatus).map((status) => {
                        return <Tasklist displayModal={displayModal} key={status} status={status} />
                    })}
                </div>
            </div>
        </>
    );
}

export default UserBoard;