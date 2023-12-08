import React from "react";
import TileIcon from "../../UI/TileIcon/TileIcon";
import Tasklist from "../Tasklist/Tasklist";

import Classes from "./UserBoard.module.css";
import { TaskStatus } from "../../constants";

const UserBoard: React.FC = () => {
    return (
        <>
            <div className={Classes.Userboard}>
                <div className={Classes.navigation}>
                    <TileIcon bgcolor="#bf0077">KC</TileIcon>
                    <div className={Classes.title}>Assigned to me</div>
                </div>
                <div className={Classes.All_lists}>
                    {Object.keys(TaskStatus).map((status) => {
                        return <Tasklist
                                    key={status}
                                    status={status} 
                                    tasks={[]} 
                                    displayAddTaskButton={false} />
                    })}
                </div>
            </div>
        </>
    );
}

export default UserBoard;