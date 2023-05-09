import React from 'react';
import { ChevronDown16Regular } from "@fluentui/react-icons";

import Classes from './DropdownTuple.module.css';

const DropdownTuple: React.FC = () => {
    return (
        <>
            <div className={Classes.drpdwnTuple}>
                <div className={Classes.drpdwnContainer}>
                    <label htmlFor="tskStatDrpdwn" className={Classes.drpdwnLbl}>Progress</label>
                    <div role="combobox" id="tskStatDrpdwn" className={Classes.statusDrpdwn}>
                        <div className={Classes.drpdwnTitle}>
                            <input type="text" className={Classes.statusFld} />
                        </div>
                        <div className={Classes.drpdwnIcon}>
                            <ChevronDown16Regular />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DropdownTuple;