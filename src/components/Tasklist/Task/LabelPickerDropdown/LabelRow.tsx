import React, { useState, useRef, useContext } from "react";
import TaskContext from "../task-context";
import { validateInputString } from "../../../../helper";
import { Edit20Regular } from "@fluentui/react-icons";

import Classes from './LabelRow.module.css';

type LabelRowProps = {
    backgroundColor: string,
    color: string,
    labelName: string,
    displayEdtLblDlg: boolean | undefined,
    edtLblClickHandler: (name: string) => void,
    clkLblRwHandler: () => void
};

const LabelRow: React.FunctionComponent<LabelRowProps> = (props) => {
    
    const { backgroundColor, color, labelName, displayEdtLblDlg, edtLblClickHandler } = props;

    const [labelValue, setLabelValue] = useState("");
    const taskContext = useContext(TaskContext);
    const labelDivRef = useRef<HTMLDivElement>(null);

    const labelStyles = {
        backgroundColor: backgroundColor,
        color: color,
        ':hover': {
            border: `1px solid ${color}`
        }
    };

    const onBlurListener = (): void => {
        if(labelValue !== "") {
            labelDivRef.current!.textContent = labelValue;
        }
        edtLblClickHandler(labelName);
    }

    const chngLblListener = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setLabelValue(e.target.value);
    }

    const edtLblClkListener = (): void => {
        edtLblClickHandler(labelName);
    }

    const lblRwClkListener = (e: React.MouseEvent<HTMLDivElement>): void => {
        if(labelDivRef.current) {
            taskContext.onAddTag({color: labelName, name: labelDivRef.current!.textContent});
        }
        props.clkLblRwHandler();
    }

    return (
        <>
            <div className={Classes.sgstnRw} role="option">
                <div className={Classes.suggestionItem}>
                    <div className={Classes.sugstnItmBtn} role="button"> 
                        <div className={Classes.edtblLblWrpr}>
                            <div className={Classes.edtblLblWrprInner}>
                                <div className={Classes.edtblLbl} onClick={lblRwClkListener}>
                                    <div ref={labelDivRef} data-color={backgroundColor} style={labelStyles} className={Classes.edtblLblChp}>{labelName}</div>
                                </div>
                                <div onClick={edtLblClkListener} className={Classes.edtLblBtn}>
                                    <Edit20Regular height={18} width={18} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                { displayEdtLblDlg && <div className={Classes.edtLblFldWrpr} onBlur={onBlurListener}>
                    <div className={Classes.edtLblInner}>
                        <div className={Classes.edtLblFldLabel}>Edit label</div>
                    </div>
                    <div className={Classes.lblEdtrTxtFld}>
                        <div className={Classes.txtFldWrpr}>
                            <div className={Classes.txtFldGrp}>
                                <input type="text" value={labelValue} onChange={chngLblListener} />
                            </div>
                        </div>
                    </div>
                </div>}
            </div>
        </>
    )
}

export default LabelRow;