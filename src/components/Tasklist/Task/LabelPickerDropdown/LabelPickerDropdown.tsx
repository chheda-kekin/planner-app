import React, { useState } from "react";
import LabelRow from "./LabelRow";
import { LabelProps, LabelProp } from "../../../../constants";

import Classes from "./LabelPickerDropdown.module.css";

const LabelPickerDropdown: React.FunctionComponent = () => {

    const initialEdtLblState = getLabelStateMap();
    const [edtLblState, setEdtLblState] = useState<Map<string, boolean>>(initialEdtLblState);

    function getLabelStateMap(): Map<string, boolean> {
        const lblStateMap = new Map<string, boolean>();

        LabelProps.forEach((label: LabelProp) => {
            lblStateMap.set(label.labelName, false);
        });

        return lblStateMap;
    }

    function edtLblClickHandler(labelName: string) {

        setEdtLblState((prevMapVal) => {
            const newStateMap = new Map<string, boolean>();

            prevMapVal.forEach((val, key) => {
                if(key !== labelName) {
                    newStateMap.set(key, false);
                } else {
                    newStateMap.set(labelName, ! (val));
                }
            });

            return newStateMap;
        });
    }

    function selectLabelOptionHandler(label: string | null) {
        console.log(`Label selected is ${label}`);
        
    }

    function getLabelRows() {
        return LabelProps.map(lblPrps => {
            return <LabelRow key={lblPrps.labelName} {...lblPrps}
                edtLblClickHandler={edtLblClickHandler}
                slctLblOptnHandler={selectLabelOptionHandler}
                displayEdtLblDlg={edtLblState.get(lblPrps.labelName)} />
        });
    }

    return (
        <>
            <div className={Classes.lblPickrDrpDwn}>
                <div className={Classes.labelPickerSuggestions}>
                    {getLabelRows()}
                </div>
            </div>
        </>
    )
}

export default LabelPickerDropdown;