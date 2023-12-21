import { useState, useContext, useRef } from 'react';
import { usePlannerDispatch } from '../../../Store';
import { NotificationActions } from '../../../slices/notification-slice';
import { planActions } from '../../../slices/plan-slice';
import PersonPicker from '../../../UI/PersonPicker/PersonPicker';
import LabelPickerDropdown from './LabelPickerDropdown/LabelPickerDropdown';
import LabelPill from './LabelPickerDropdown/LabelPill';
import ProgressDropdown from './ProgressDropdown/ProgressDropdown';
import PriorityDropdown from './PriorityDropdown/PriorityDropdown';
import DatePickerField from '../../../UI/DatePickerField/DatePickerField';
import DescriptionField from './DescriptionField/DescriptionField';
import CommentBox from './CommentBox/CommentBox';
import { Checkbox } from "@mui/material";

import { getTimeElapsed, escapeQuotes } from '../../../helper';
import { LabelColors, LabelFontColors, TaskMember, 
    baseUrl, MessageType } from '../../../constants';
import TaskContext from './task-context';


import Classes from './TaskForm.module.css';
import AppClasses from '../../../App.module.css';
import { Tag20Regular, Dismiss16Regular, 
    MoreHorizontal16Regular } from "@fluentui/react-icons";
import axios from 'axios';
import { initializeIcons } from "@fluentui/react";



initializeIcons();

const TaskForm: React.FC<{ onCloseModal: () => void }> = (props) => {

    const [shwLblPickrDrpdwn, setShwLblPickrDrpdwn] = useState(false);

    const dispatch = usePlannerDispatch();

    const tskCtx = useContext(TaskContext);
    const selectedMembers = tskCtx.members;
    const planName = tskCtx.planName.trim();
    const lastUpdatedTime = getTimeElapsed(tskCtx.lastUpdatedDate);
    const lastUpdatedDate = new Date(tskCtx.lastUpdatedDate);
    
    const initialTaskState = useRef(tskCtx.taskStatus);

    // const labelPickrRef = useRef<HTMLDivElement | undefined>();

    const addRemoveMemberHandler = (member: TaskMember): void => {
        if (selectedMembers.findIndex(m => m.id === member.id) === -1) {
            tskCtx.onAddMember(member);
        } else {
            tskCtx.onRemoveMember(member);
        }
    }

    const checkboxStyles = {
        color: 'rgb(33, 115, 70)',
        '&.Mui-checked': {
            color: 'rgb(33, 115, 70)',
        },
        padding: 0
    };

    const getLabelPills = (): React.ReactNode => {

        return (tskCtx.labels.map(label => {
            const labelColor = label.color;
            let bgColor = '';
            let color = '';

            for (const [key, val] of Object.entries(LabelColors)) {
                if (key === labelColor) {
                    bgColor = val;
                }
            }

            for (const [key, val] of Object.entries(LabelFontColors)) {
                if (key === labelColor) {
                    color = val;
                }
            }

            return <LabelPill key={label.value} colorName={labelColor} 
                backgroundColor={bgColor} color={color} labelName={label.value} />
        }))
    }

    const submitFormHandler = async () => {

        if(tskCtx.name === '') {
            dispatch(NotificationActions.showNotification({
                message: 'Task name can not be blank',
                notificationType: MessageType.Error,
                isNotification: true
            }));
            
            return null;
        }

        if(tskCtx.startDate > tskCtx.dueDate) {
            dispatch(NotificationActions.showNotification({
                message: 'Start date can not be greater than due date',
                notificationType: MessageType.Error,
                isNotification: true
            }));
            
            return null;
        }

        const requestBody = {
            id: tskCtx.id,
            name: escapeQuotes(tskCtx.name),
            planId: tskCtx.planId,
            status: tskCtx.taskStatus,
            priority: tskCtx.taskPriority,
            startDate: tskCtx.startDate,
            dueDate: tskCtx.dueDate,
            created: tskCtx.createdDate,
            updated: Date.now(),
            notes: escapeQuotes(tskCtx.notes),
            members: tskCtx.members.map(m => m.id),
            labels: tskCtx.labels,
            comments: tskCtx.taskComments.map(c => {
                return {
                    comment: escapeQuotes(c.commentText.trim()),
                    member: c.memberId,
                    date: c.commentDate
                }
            })
        };

        try {

            console.log("### Initial state of the task is ", initialTaskState.current);
            const resp = await axios.put(`${baseUrl}/tasks/update`, requestBody);
            if(resp.status === 200) {
                // Send success notification
                dispatch(NotificationActions.showNotification({
                    message: 'Task updated successfully!',
                    notificationType: MessageType.Success,
                    isNotification: true
                }));

                if(initialTaskState.current !== tskCtx.taskStatus) {
                    dispatch(planActions.updateTaskStatus({
                        id: tskCtx.planId,
                        oldStatus: initialTaskState.current,
                        newStatus: tskCtx.taskStatus
                    }));
                }

                // Closing the modal
                props.onCloseModal();

            } else {
                // Send error notification
                dispatch(NotificationActions.showNotification({
                    message: 'Something went wront!',
                    notificationType: MessageType.Error,
                    isNotification: true
                }));
            }
        } catch(err: any) {
            console.log(err);
            dispatch(NotificationActions.showNotification({
                message: err.message,
                notificationType: MessageType.Error,
                isNotification: true
            }));
        }
    }

    const toggleLabelPickerHandler = () => {
        setShwLblPickrDrpdwn(prevVal => ! prevVal);
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
                                    <Dismiss16Regular color='rgb(96, 94, 92)' />
                                </button>
                            </div>
                        </div>
                        <div className={Classes.dialogContent}>
                            <div className={Classes.taskEditor}>
                                {/* Plan Name */}
                                <div className={Classes.planTitle}>
                                    {planName}
                                </div>
                                <div className={Classes.taskName}>
                                    <button className={Classes.markCompleteBtn} title="Mark task as complete">
                                        <Checkbox size="small" sx={checkboxStyles} />
                                    </button>
                                    <div className={Classes.taskNameFieldWrapper}>
                                        <input value={tskCtx.name} onChange={(e) => { tskCtx.onTaskNameChange(e) }} />
                                    </div>
                                </div>
                                {/* Last updated time */}
                                <div className={Classes.lastModifiedSection}>
                                    Last changed {lastUpdatedTime} ago by you
                                </div>
                                <div className={Classes.assignedToUsers}>
                                    <div className={Classes.assigneeRow}>
                                        <PersonPicker selectedMembers={selectedMembers} 
                                            selectMemberHandler={addRemoveMemberHandler} />
                                    </div>
                                </div>
                                <div className={Classes.labelPickerArea}>
                                    <div className={Classes.labelPickerWrapper}>
                                        <div className={Classes.labelPickerIcon}>
                                            <Tag20Regular color="rgb(96, 94, 92)" />
                                        </div>
                                        <div className={Classes.labelPicker} onClick={toggleLabelPickerHandler}>
                                            <div className={Classes.labelPickerField}>
                                                {getLabelPills()}
                                                <div className={Classes.labelPickerFieldGrp}>
                                                    <input type="text" placeholder="Search for label" />
                                                    <div>
                                                        {shwLblPickrDrpdwn && <LabelPickerDropdown />}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={Classes.prgrsDrpdwns}>
                                    <div className={Classes.drpDwnWrpr}>
                                        <div className={Classes.lblWrpr}>
                                            <label>Progress</label>
                                        </div>
                                        <ProgressDropdown />
                                    </div>
                                    <div className={Classes.drpDwnWrpr}>
                                        <div className={Classes.lblWrpr}>
                                            <label>Priority</label>
                                        </div>
                                        <PriorityDropdown />
                                    </div>
                                </div>
                                <div className={Classes.dtPickers}>
                                    <div className={Classes.dtPickrWrpr}>
                                        <label htmlFor='strtDtPckr' className={Classes.dtPickrLbl}>
                                            Start date
                                        </label>
                                        <div className={Classes.dtPickr}>
                                            <DatePickerField selectedDate={new Date(tskCtx.startDate)} selectDateListener={tskCtx.onStartDateChange} />
                                        </div>
                                    </div>
                                    <div className={Classes.dtPickrWrpr}>
                                        <label htmlFor='dueDtPckr' className={Classes.dtPickrLbl}>
                                            Due date
                                        </label>
                                        <div className={Classes.dtPickr}>
                                            <DatePickerField  selectedDate={new Date(tskCtx.dueDate)} selectDateListener={tskCtx.onDueDateChange} />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <DescriptionField />
                                </div>
                                <div>
                                    <CommentBox />
                                </div>
                            </div>
                        </div>
                        <div className={Classes.dialogFooter}>
                            <button className={AppClasses.primaryBtn} onClick={submitFormHandler}>Save</button>
                            <button className={AppClasses.cancelBtn} onClick={props.onCloseModal}>Cancel</button>
                        </div>
                </div>
    )
}

export default TaskForm;