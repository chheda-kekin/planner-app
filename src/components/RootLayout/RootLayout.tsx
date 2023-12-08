import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import Notification from "../Notification/Notification";
// import Main from "../Main/Main";

import Classes from "./RootLayout.module.css";
import Modal from "../../UI/Modal";

const RootLayout: React.FC = () => {

    return (
        <>
            <Header />
            <div className={Classes.rootLayout}>
                <Sidebar />
                <div className={Classes.outlet}>
                    <Outlet />
                    <Notification />
                </div>
            </div>
        </>
    )
}

export default RootLayout;