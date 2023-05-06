import { useState, useContext } from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CloseIcon from '@mui/icons-material/Close';
import { Checkbox } from "@mui/material";
import PersonPicker from '../../../UI/PersonPicker/PersonPicker';
import { Tag20Regular } from "@fluentui/react-icons";
import LabelPickerDropdown from './LabelPickerDropdown/LabelPickerDropdown';
import LabelPill from './LabelPickerDropdown/LabelPill';
import { Tag, LabelColors, LabelFontColors } from '../../../constants';
import TaskContext, { TaskContextType } from './task-context';

import Classes from './TaskForm.module.css';
import AppClasses from '../../../App.module.css';


const TaskForm: React.FC<{ onCloseModal: () => void }> = (props) => {

    const [shwLblPickrDrpdwn, setShwLblPickrDrpdwn] = useState(false);

    const tskCtx = useContext(TaskContext);

    console.log('tskCtx.tasks', tskCtx.tags);

    const checkboxStyles = {
        color: 'rgb(33, 115, 70)',
        '&.Mui-checked': {
            color: 'rgb(33, 115, 70)',
        },
        padding: 0
    };

    function getLabelPills(): React.ReactNode {
        return (tskCtx.tags.map(tag => {
            const tagColor = tag.color;
            let bgColor = '';
            let color = '';

            for(const [key, val] of Object.entries(LabelColors)) {
                if(key === tagColor) {
                    bgColor = val;
                }
            }

            for(const [key, val] of Object.entries(LabelFontColors)) {
                if(key === tagColor) {
                    color = val;
                }
            }

            return <LabelPill key={tag.name} backgroundColor={bgColor} color={color} labelName={tag.name} />
        }))
    }
    
    return (
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
                                <input value={tskCtx.name} onChange={(e) => { tskCtx.onTaskNameChange(e) }} />
                                { tskCtx.name }
                            </div>
                        </div>
                        <div className={Classes.lastModifiedSection}>Last changed 2 hours ago by you</div>
                        <div className={Classes.assignedToUsers}>
                            <div className={Classes.assigneeRow}>
                                <PersonPicker />
                            </div>
                        </div>
                        <div className={Classes.labelPickerArea}>
                            <div className={Classes.labelPickerWrapper}>
                                <div className={Classes.labelPickerIcon}>
                                    <Tag20Regular color="rgb(96, 94, 92)" />
                                </div>
                                <div className={Classes.labelPicker} onClick={() => setShwLblPickrDrpdwn(true)}>
                                    <div className={Classes.labelPickerField}>
                                        {/* <LabelPill backgroundColor="rgb(245, 237, 206)" color="rgb(109, 87, 0)" labelName="Yellow" />
                                        <LabelPill backgroundColor="rgb(219, 235, 199)" color="rgb(56, 99, 4)" labelName="Green" /> */}
                                        { getLabelPills() }
                                        <div className={Classes.labelPickerFieldGrp}>
                                            <input type="text" placeholder="Search for label" />
                                            { shwLblPickrDrpdwn && <LabelPickerDropdown /> }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={Classes.dialogFooter}>
                    <button className={AppClasses.cancelBtn} onClick={props.onCloseModal}>Cancel</button>
                </div>
            </div>
    )
}

export default TaskForm;