import React, { useContext } from "react";
import { Dismiss16Regular } from "@fluentui/react-icons";

import Classes from "./LabelPill.module.css";
import TaskContext from "../task-context";
import { Label } from "../../../../constants";

type LabelPillProps = {
    backgroundColor: string, 
    color: string, 
    labelName: string
};

const LabelPill: React.FC<LabelPillProps> = ({backgroundColor, color, labelName}) => {


    const tskCtx = useContext(TaskContext);

    const edtLblStyles = {
        backgroundColor: backgroundColor,
        color: color
    };

    const removeLabelHandler = (e: React.MouseEvent<SVGElement>) => {
        const labelVal: Label = {
            color: backgroundColor,
            value: labelName
        };

        tskCtx.onRemoveLabel(labelVal);
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
                                    <Dismiss16Regular onClick={removeLabelHandler} />
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