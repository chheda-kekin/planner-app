import React, { useState } from "react";
import { useSelector } from "react-redux";
import { PlannerState } from "../../Store";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import Notification from "../Notification/Notification";
// import Main from "../Main/Main";

import Classes from "./RootLayout.module.css";
import Modal from "../../UI/Modal";

const RootLayout: React.FC = () => {

    const notification = useSelector((state: PlannerState) => {
        return state.notification
    });

    return (
        <>
            <Header />
            <div className={Classes.rootLayout}>
                <Sidebar />
                <div className={Classes.outlet}>
                    <Outlet />
                    {notification.isNotification && <Notification />}
                </div>
            </div>
        </>
    )
}

export default RootLayout;