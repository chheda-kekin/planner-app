import React from "react";

import Classes from "./Task.module.css";

const Task: React.FC = () => {
    return (
        <>
            <div className={Classes.taskCard}>
                <div className={Classes.topBar}>
                    <div className={Classes.planName}>Making Planner App in ReactJS + TS</div>
                    <div className={Classes.titleRow}>
                        <button role="checkbox"></button>
                    </div>
                </div>
                <div className={Classes.bottomBar}>Bottom Bar</div>
            </div>
        </>
    )

}

export default Task;