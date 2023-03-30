import React from "react";
import TileIcon from "../../UI/TileIcon/TileIcon";
import Tasklist from "../Tasklist/Tasklist";

import Classes from "./UserBoard.module.css";
import Constants from "../../constants";

const UserBoard: React.FC = () => {

    console.log("UserBoard component loaded!!!");
    const {Task_Status} = Constants;
    return (
        <>
            <div className={Classes.Userboard}>
            <div className={Classes.navigation}>
                <TileIcon bgcolor="#bf0077">KC</TileIcon>
                <div className={Classes.title}>Assigned to me</div>
            </div>
            <div className={Classes.All_lists}>
                <Tasklist  status={Task_Status['0']} />
                <Tasklist  status={Task_Status['1']} />
                <Tasklist  status={Task_Status['2']} />
            </div>
            </div>
        </>
    );
}

export default UserBoard;