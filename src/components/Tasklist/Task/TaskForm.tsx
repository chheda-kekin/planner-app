import { useState } from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CloseIcon from '@mui/icons-material/Close';
import { Checkbox } from "@mui/material";

import Classes from './TaskForm.module.css';
import AppClasses from '../../../App.module.css';
import PersonPicker from '../../../UI/PersonPicker/PersonPicker';
// import { AddFilled, Tag16Regular, Tag24Regular } from "@fluentui/react-icons";

const TaskForm: React.FC<{ onCloseModal: () => void }> = (props) => {

    const [taskName, setTaskName] = useState("Some random dummy name");

    const checkboxStyles = {
        color: 'rgb(33, 115, 70)',
        '&.Mui-checked': {
            color: 'rgb(33, 115, 70)',
        },
        padding: 0
    };

    const personPickerStyles = {};

    return (
        <>
            <div className={Classes.dialog}>
                <div className={Classes.dialogHeader}>
                    <p className={Classes.dialogTitle}></p>
                    <div className={Classes.topBtn}>
                        <button className={Classes.btnIcon}><MoreHorizIcon fontSize="small" style={{ color: 'rgb(96, 94, 92)' }} /></button>
                        <button className={Classes.btnIcon} onClick={props.onCloseModal}><CloseIcon fontSize="small" style={{ color: 'rgb(96, 94, 92)' }} /></button>
                    </div>
                </div>
                <div className={Classes.dialogContent}>
                    <div className={Classes.taskEditor}>
                        <div className={Classes.planTitle}>Becoming ReactJS Pro</div>
                        <div className={Classes.taskName}>
                            <button className={Classes.markCompleteBtn} title="Mark task as complete">
                                <Checkbox size="small" sx={checkboxStyles} />
                            </button>
                            <div className={Classes.taskNameFieldWrapper}>
                                <input value={taskName} onChange={(e) => { setTaskName(e.target.value) }} />
                            </div>
                        </div>
                        <div className={Classes.lastModifiedSection}>Last changed 2 hours ago by you</div>
                        <div className={Classes.assignedToUsers}>
                            <div className={Classes.assigneeRow}>
                                <PersonPicker />
                                {/* <AddFilled color='rgb(33, 115, 70)' /> */}
                                {/* <Tag24Regular color='rgb(96, 94, 92)' />         */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={Classes.dialogFooter}>
                    <button className={AppClasses.Cancel_Btn} onClick={props.onCloseModal}>Cancel</button>
                </div>
            </div>
        </>
    )
}

export default TaskForm;