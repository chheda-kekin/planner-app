import React from "react";
import { Dismiss12Regular, Dismiss16Regular } from "@fluentui/react-icons";

import Classes from "./LabelPill.module.css";

const LabelPill: React.FC<{backgroundColor: string, color: string, labelName: string}> = ({backgroundColor, color, labelName}) => {

    const edtLblStyles = {
        backgroundColor: backgroundColor,
        color: color
    };

    return (
        <>
            <div className={Classes.edtblLblWrpr}>
                <div className={Classes.edtblLblWrapperInner}>
                    <div className={Classes.edtblLbl} style={edtLblStyles}>
                        <div className={Classes.edtblLblInner}>
                            <button className={Classes.edtblLblTxt}>{labelName}</button>
                            <button className={Classes.rmvBtn}>
                                <Dismiss16Regular />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LabelPill;