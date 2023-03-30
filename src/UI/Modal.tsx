import React from "react";
import Classes from "./Modal.module.css";
import ReactDOM from "react-dom";

import AppClasses from "../App.module.css";


const Modal: React.FC<{children: React.ReactNode}> = props => {

    console.log("Modal display!!!");

    return (
        ReactDOM.createPortal(
        <>
            <div className={Classes.modal}>
                <div className={Classes.overlay}>
                </div>
                <div>
                    {props.children}
                </div>
                
            </div>
        </>, document.getElementById("modal-root") as HTMLElement)
    )
}

export default Modal;