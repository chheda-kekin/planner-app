import React, { useRef, useEffect } from "react";
import Classes from "./Modal.module.css";
import ReactDOM from "react-dom";


const Modal: React.FC<{children: React.ReactNode}> = props => {

    const overlayRef = useRef<HTMLDivElement>(null);
    
    const overlayStyles = {
        width: window.innerWidth,
        height: window.innerHeight
    };

    return (
        ReactDOM.createPortal(
        <>
                <div className={Classes.overlay} ref={overlayRef} style={overlayStyles}>
                </div>
                <div>
                    {props.children}
                </div>
        </>, document.getElementById("modal-root") as HTMLElement)
    )
}

export default Modal;