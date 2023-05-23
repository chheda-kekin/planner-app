import React, { useState } from 'react';

import Classes from './DescriptionField.module.css';

const DescriptionField: React.FC<{ dscrptn: string }> = (props) => {
    const [dscrptnVal, setDscrptnVal] = useState(props.dscrptn);

    const changeValueHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDscrptnVal(e.target.value);
    }

    return (
        <>
            <div className={Classes.dscrptn}>
                <div className={Classes.dscrptnHdr}>Notes</div>
                <div>
                    <textarea className={Classes.dscrptnFld} value={dscrptnVal} onChange={changeValueHandler} />
                </div>
            </div>
        </>
    )
}

export default DescriptionField;