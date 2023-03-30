import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
// import Main from "../Main/Main";

import Classes from "./RootLayout.module.css";

const RootLayout: React.FC = () => {
    return (
        <>
            <Header />
            <div className={Classes.home}>
                <Sidebar />
            <div className={Classes.outlet}>
                <Outlet />
            </div>
            </div>
        </>
    )
}

export default RootLayout;