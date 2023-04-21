import React, { useRef, useEffect } from "react";
import Classes from "./Modal.module.css";
import ReactDOM from "react-dom";


const Modal: React.FC<{children: React.ReactNode, overlayWidth: number, overlayHeight: number}> = props => {

    const overlayRef = useRef<HTMLDivElement>(null);
    
    const overlayStyles = {
        width: window.innerWidth,
        height: window.innerHeight
    };

    console.log("Modal display!!!");

    useEffect(() => {
        const { height, width } = overlayRef.current!.getBoundingClientRect();
        console.log(`Overlay width is ${width} & height is ${height}`);
    }, []);

    return (
        ReactDOM.createPortal(
        <>
            {/* <div className={Classes.modal}> */}
                <div className={Classes.overlay} ref={overlayRef} style={overlayStyles}>
                </div>
                <div>
                    {props.children}
                </div>
                
            {/* </div> */}
        </>, document.getElementById("modal-root") as HTMLElement)
    )
}

export default Modal;