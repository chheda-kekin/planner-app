import React, { useContext } from "react";
import { Dismiss12Regular, Dismiss16Regular } from "@fluentui/react-icons";

import Classes from "./LabelPill.module.css";
import TaskContext from "../task-context";
import { Tag } from "../../../../constants";

const LabelPill: React.FC<{backgroundColor: string, color: string, labelName: string | null}> = ({backgroundColor, color, labelName}) => {


    const tskCtx = useContext(TaskContext);

    const tagVal: Tag = {
        color: backgroundColor,
        name: labelName
    };

    const edtLblStyles = {
        backgroundColor: backgroundColor,
        color: color
    };

    const removeTagHandler = (e: React.MouseEvent<SVGElement>) => {
        tskCtx.onRemoveTag(tagVal);
    }

    return (
        <>
            <div className={Classes.edtblLblWrpr}>
                <div className={Classes.edtblLblWrapperInner}>
                    <div className={Classes.edtblLbl} style={edtLblStyles}>
                        <div className={Classes.edtblLblInner}>
                            <button className={Classes.edtblLblTxt}>{labelName}</button>
                            <button className={Classes.rmvBtn}>
                                {/* <div> */}
                                    <Dismiss16Regular onClick={removeTagHandler} />
                                {/* </div> */}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LabelPill;