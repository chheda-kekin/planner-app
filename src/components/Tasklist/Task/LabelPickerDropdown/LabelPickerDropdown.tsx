import React, { useState, useReducer } from "react";
import LabelRow from "./LabelRow";
import { LabelProps, LabelProp } from "../../../../constants";

import Classes from "./LabelPickerDropdown.module.css";

const LabelPickerDropdown: React.FC = () => {
    const [labelRowProps, setLabelRowProps] = useState<LabelProp[]>(LabelProps);

    function edtLblClickHandler(labelName: string): void {
        let newLabelPropsState: LabelProp[] = [];

        newLabelPropsState = labelRowProps.map(l => {
            if(l.labelName === labelName) {
                l.displayDialog = ! l.displayDialog;
            } else {
                l.displayDialog = false;
            } 
            return l;
        });

        setLabelRowProps(newLabelPropsState);
    }

    function getLabelRows() {
        return labelRowProps.map(lblPrps => {
            return <LabelRow key={lblPrps.labelName} {...lblPrps}
                        editLabelClickHandler={edtLblClickHandler.bind(lblPrps.labelName)} />
        });
    }

    return (
        <>
            <div className={Classes.lblPickrDrpDwn}>
                <div className={Classes.labelPickerSuggestions}>
                    { getLabelRows() }
                </div>
            </div>
        </>
    )
};

export default LabelPickerDropdown;