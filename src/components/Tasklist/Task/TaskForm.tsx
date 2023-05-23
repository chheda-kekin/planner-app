import { useState, useContext } from 'react';
import PersonPicker from '../../../UI/PersonPicker/PersonPicker';
import LabelPickerDropdown from './LabelPickerDropdown/LabelPickerDropdown';
import LabelPill from './LabelPickerDropdown/LabelPill';
import DropdownTuple from '../../../UI/DropdownTuple/DropdownTuple';
import DatePickerField from '../../../UI/DatePickerField/DatePickerField';
import DescriptionField from './DescriptionField/DescriptionField';
import CommentBox from './CommentBox/CommentBox';


import { Tag20Regular, Dismiss16Regular, MoreHorizontal16Regular } from "@fluentui/react-icons";
import { Checkbox } from "@mui/material";

import { LabelColors, LabelFontColors } from '../../../constants';
import TaskContext from './task-context';

import Classes from './TaskForm.module.css';
import AppClasses from '../../../App.module.css';


const TaskForm: React.FC<{ onCloseModal: () => void }> = (props) => {

    const [shwLblPickrDrpdwn, setShwLblPickrDrpdwn] = useState(false);

    const tskCtx = useContext(TaskContext);

    const checkboxStyles = {
        color: 'rgb(33, 115, 70)',
        '&.Mui-checked': {
            color: 'rgb(33, 115, 70)',
        },
        padding: 0
    };

    const getLabelPills = (): React.ReactNode => {
        return (tskCtx.tags.map(tag => {
            const tagColor = tag.color;
            let bgColor = '';
            let color = '';

            for (const [key, val] of Object.entries(LabelColors)) {
                if (key === tagColor) {
                    bgColor = val;
                }
            }

            for (const [key, val] of Object.entries(LabelFontColors)) {
                if (key === tagColor) {
                    color = val;
                }
            }

            return <LabelPill key={tag.name} backgroundColor={bgColor} color={color} labelName={tag.name} />
        }))
    }

    const blurFieldHandler = () => {
        setShwLblPickrDrpdwn(false);
    }

    return (
        <div className={Classes.dialog}>
            <div className={Classes.dialogHeader}>
                <p className={Classes.dialogTitle}></p>
                <div className={Classes.topBtn}>
                    <button className={Classes.btnIcon}>
                        <MoreHorizontal16Regular color='rgb(96, 94, 92)' />
                    </button>
                    <button className={Classes.btnIcon} onClick={props.onCloseModal}>
                        <Dismiss16Regular  color='rgb(96, 94, 92)' />
                    </button>
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
                                    {getLabelPills()}
                                    <div className={Classes.labelPickerFieldGrp}>
                                        <input type="text" placeholder="Search for label" onBlur={blurFieldHandler} />
                                        {shwLblPickrDrpdwn && <LabelPickerDropdown />}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={Classes.prgrsDrpdwns}>
                        <DropdownTuple />
                        <DropdownTuple />
                        <DropdownTuple />
                    </div>
                    <div className={Classes.dtPickers}>
                        <div className={Classes.dtPickrWrpr}>
                            <label htmlFor='strtDtPckr' className={Classes.dtPickrLbl}>
                                Start date
                            </label>
                            <div className={Classes.dtPickr}>
                                <DatePickerField />
                            </div>
                        </div>
                        <div className={Classes.dtPickrWrpr}>
                            <label htmlFor='dueDtPckr' className={Classes.dtPickrLbl}>
                                Due date
                            </label>
                            <div className={Classes.dtPickr}>
                                <DatePickerField />
                            </div>
                        </div>
                    </div>
                    <div>
                        <DescriptionField dscrptn="Some random text as notes" />
                    </div>
                    <div>
                        <CommentBox taskComments={tskCtx.taskComments} />
                    </div>
                </div>
            </div>
            <div className={Classes.dialogFooter}>
                <button className={AppClasses.primaryBtn} onClick={props.onCloseModal}>Ok</button>
                <button className={AppClasses.cancelBtn} onClick={props.onCloseModal}>Cancel</button>
            </div>
        </div>
    )
}

export default TaskForm;