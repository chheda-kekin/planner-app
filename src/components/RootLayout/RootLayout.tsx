import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";

import Classes from "./RootLayout.module.css";

const RootLayout: React.FC = () => {
    return (
        <>
            <Header />
            <div className={Classes.rootLayout}>
                <Sidebar />
                <div className={Classes.outlet}>
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default RootLayout;