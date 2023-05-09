import React from 'react';

import Classes from './DescriptionField.module.css';

const DescriptionField: React.FC = () => {
    return (
        <>
            <div className={Classes.dscrptn}>
                <div className={Classes.dscrptnHdr}>Notes</div>
                <div className={Classes.dscrptnFld}>
                    This is Task
                </div>
            </div>
        </>
    )
}

export default DescriptionField;