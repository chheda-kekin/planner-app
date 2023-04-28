import React, { useState, useRef } from "react";
import { validateInputString } from "../../../../helper";
import { Edit20Regular } from "@fluentui/react-icons";

import Classes from './LabelRow.module.css';
import { ButtonClickEvent } from "plotly.js";

type LabelRowProps = {
    backgroundColor: string,
    color: string,
    labelName: string,
    displayEdtLblDlg: boolean | undefined,
    edtLblClickHandler: (name: string) => void,
    slctLblOptnHandler: (label: string | null) => void
};

const LabelRow: React.FunctionComponent<LabelRowProps> = ({ backgroundColor, color, labelName, displayEdtLblDlg, edtLblClickHandler, slctLblOptnHandler }) => {
    
    const [labelValue, setLabelValue] = useState("");
    const labelDivRef = useRef<HTMLDivElement>(null);

    const labelStyles = {
        backgroundColor: backgroundColor,
        color: color,
        ':hover': {
            border: `1px solid ${color}`
        }
    };

    const onBlurListener = (): void => {
        labelDivRef.current!.textContent = labelValue;
        edtLblClickHandler(labelName);
    }

    const chngLblListener = (e: React.ChangeEvent<HTMLInputElement>): void => {
        if(validateInputString(e.target.value)) {
            setLabelValue(e.target.value)    
        }
    }

    const edtLblClkListener = (): void => {
        edtLblClickHandler(labelName);
    }

    const lblRwClkListener = (e: React.MouseEvent<HTMLDivElement>): void => {
        if(labelDivRef.current) {
            slctLblOptnHandler(labelDivRef.current!.textContent);
        }
    }

    return (
        <>
            <div className={Classes.sgstnRw} role="option">
                <div className={Classes.suggestionItem}>
                    <div className={Classes.sugstnItmBtn} role="button" onClick={lblRwClkListener}>
                        <div className={Classes.edtblLblWrpr}>
                            <div className={Classes.edtblLblWrprInner}>
                                <div ref={labelDivRef} style={labelStyles} className={Classes.edtblLbl}>{labelName}</div>
                                <div onClick={edtLblClkListener} className={Classes.edtLblBtn}>
                                    <Edit20Regular height={18} width={18} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {displayEdtLblDlg && <div className={Classes.edtLblFldWrpr} onBlur={onBlurListener}>
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