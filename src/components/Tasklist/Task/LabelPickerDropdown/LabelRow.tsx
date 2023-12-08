import React, { useState, useContext } from "react";
import TaskContext from "../task-context";
import { Edit20Regular } from "@fluentui/react-icons";

import Classes from './LabelRow.module.css';

type LabelRowProps = {
    backgroundColor: string,
    color: string,
    labelName: string,
    displayDialog: boolean,
    editLabelClickHandler: (labelName: string) => void
};

const LabelRow: React.FC<LabelRowProps> = (props) => {
    
    const { backgroundColor, color, labelName, displayDialog, editLabelClickHandler } = props;

    const [labelValue, setLabelValue] = useState(labelName);
    const taskContext = useContext(TaskContext);

    const labelStyles = {
        backgroundColor: backgroundColor,
        color: color,
        ':hover': {
            border: `1px solid ${color}`
        }
    };

    const onBlurListener = (): void => {
        editLabelClickHandler(labelName);
    }

    const chngLblListener = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setLabelValue(e.target.value);
    }

    const edtLblClkListener = (e: React.MouseEvent<HTMLElement>): void => {
        e.stopPropagation();
        editLabelClickHandler(labelName);
    }

    const lblRwClkListener = (e: React.MouseEvent<HTMLElement>): void => {
        e.stopPropagation();
        taskContext.onAddLabel({color: labelName, value: labelValue});
        setLabelValue(labelName);
    }

    return (
        <>
            <div className={Classes.sgstnRw}>
                <div className={Classes.suggestionItem}>
                    <div className={Classes.sugstnItmBtn}> 
                        <div className={Classes.edtblLblWrpr}>
                            <div className={Classes.edtblLblWrprInner}>
                                <div className={Classes.edtblLbl} onClick={lblRwClkListener}>
                                    <div data-color={backgroundColor} style={labelStyles} className={Classes.edtblLblChp}>
                                        { labelValue }
                                    </div>
                                </div>
                                <div onClick={edtLblClkListener} className={Classes.edtLblBtn}>
                                    <Edit20Regular height={18} width={18} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                { displayDialog && <div className={Classes.edtLblFldWrpr} onBlur={onBlurListener}>
                    <div className={Classes.edtLblInner}>
                        <div className={Classes.edtLblFldLabel}>Edit label</div>
                    </div>
                    <div className={Classes.lblEdtrTxtFld}>
                        <div className={Classes.txtFldWrpr}>
                            <div className={Classes.txtFldGrp}>
                                <input type="text" value={labelValue} onChange={chngLblListener} 
                                    onClick={(e: React.MouseEvent<HTMLElement>) => e.stopPropagation()} />
                            </div>
                        </div>
                    </div>
                </div> }
            </div>
        </>
    )
}

export default LabelRow;