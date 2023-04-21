import React from "react";
import Task from "./Task/Task";

import Classes from "./Tasklist.module.css";

const Tasklist: React.FC<{ status: string, displayModal: () => void }> = (props) => {
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
                        <Task displayModal={props.displayModal} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Tasklist;