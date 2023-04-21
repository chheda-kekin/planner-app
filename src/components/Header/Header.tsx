import React from "react";
import Classes from "./Header.module.css";


const Header: React.FC = () => {
    return (
        <>
            <header className={Classes.header}>
                Planner App
            </header>
        </>
    )
}

export default Header;