import React, { useContext } from 'react';
import TaskContext from '../task-context';

import Classes from './DescriptionField.module.css';

const DescriptionField: React.FC = () => {

    const taskContext = useContext(TaskContext);

    const notes = taskContext.notes;

    const changeValueHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        taskContext.onUpdateNotes(e.target.value);
    }

    return (
        <>
            <div className={Classes.dscrptn}>
                <div className={Classes.dscrptnHdr}>Notes</div>
                <div>
                    <textarea className={Classes.dscrptnFld} 
                        value={notes} 
                        onChange={changeValueHandler} />
                </div>
            </div>
        </>
    )
}

export default DescriptionField;