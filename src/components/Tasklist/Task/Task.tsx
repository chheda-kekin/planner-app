import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { usePlannerDispatch } from "../../../Store";
import { useSelector } from "react-redux";
import { PlannerState } from "../../../Store";
import { NotificationActions } from "../../../slices/notification-slice";
import { planActions } from "../../../slices/plan-slice";
import TaskForm from "./TaskForm";
import TaskContextProvider from "./TaskContextProvider";
import { getPersonaInitials, getLabelColorValue, 
    getLabelFontColorValue, getPersonaColor } from "../../../helper";
import { Label, MessageType, baseUrl, TaskStatus, Plan, Member } from "../../../constants"; 
import { DatePicker, IDatePicker, IDatePickerStyles } from "@fluentui/react";
import { IPersonaStyles, Persona, PersonaSize } from '@fluentui/react/lib/Persona';
import { Checkbox } from "@mui/material";
import Modal from "@mui/material/Modal";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { Delete16Regular, Edit16Regular } from '@fluentui/react-icons'
import { initializeIcons } from '@fluentui/react';

import Classes from "./Task.module.css";
import AppClasses from "../../../App.module.css";

initializeIcons();

type TaskProps = {
    id: number, 
    name: string,
    status: string,
    planId: number,
    planName: string,
    dueDate: number,
    members: Member[],
    labels: string
};

const Task: React.FC<TaskProps> = (props) => {

    let taskNameStyles: any; 

    if(props.status === "Completed") {
        taskNameStyles = {
            textDecoration: 'line-through solid 1px rgb(50, 49, 48)'
        }
    } else {
        taskNameStyles = {
            textDecoration: 'none'
        }
    }

    const [open, setOpen] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);

    const [isRemoved, setIsRemoved] = useState(false);

    const [taskData, setTaskData] = useState();

    const [isChecked, setIsChecked] = useState(props.status === "Completed");

    const [dueDateVal, setDueDateVal] = useState(props.dueDate);

    const dispatch = usePlannerDispatch();

    const plans = useSelector((state: PlannerState) => state.plans);

    function handleCheckboxToggle(e: React.ChangeEvent<HTMLInputElement>) {
        setIsChecked(currentVal => ! currentVal);
    }

    const showNotification = useCallback((type: string, message: string) => {
        dispatch(NotificationActions.showNotification({
            message: message, 
            notificationType: type, 
            isNotification: true
        }));
    }, [dispatch]);

    // function showNotification(type: string, message: string): void {
        
    // }

    async function deleteTask() {
        try {
            const url = `${baseUrl}/tasks/delete/${props.id}`;
            const { status } = await axios.delete(url);
            if(status === 200) {
                setIsRemoved(true);
                const payload = {
                    id: props.planId,
                    status: props.status,
                    isDue: props.dueDate < Date.now()
                }
                dispatch(planActions.deleteTaskFromPlan(payload));
            }
        } catch(err) {
            showNotification(MessageType.Error, 'Unable to delete something went wrong!');
        }            
    }

    const updateTask = useCallback(async () => {
        const reqBody = {
            id: props.id,
            status: "Completed",
            dueDate: props.dueDate
        };
        
        try {
            const { status } = await axios.put(`${baseUrl}/tasks/updateStatus`, reqBody);

            if(status === 200) {
                showNotification(MessageType.Success, 'Task marked as complete');
            }
        } catch(err: any) {
            showNotification(MessageType.Error, `${err.message}`);
        }
    }, [props.id, props.dueDate, showNotification]);

    const updateDueDate = useCallback(async () => {
        try {
            const url = `${baseUrl}/tasks/updateStatus`;
            const reqBody = {
                id: props.id,
                status: props.status,
                dueDate: dueDateVal
            }
            const { status } = await axios.put(url, reqBody);
            if(status === 200) {
                showNotification(MessageType.Success, 'Due date updated successfully!');
            }
        } catch(err: any) {
            showNotification(MessageType.Error, `${err.message}`);
        }
    }, [props.id, props.status, dueDateVal, showNotification]);

    useEffect(() => {
        if(isRemoved) {
            showNotification(MessageType.Success, 'Task deleted!');
        }
    }, [isRemoved, showNotification]);

    useEffect(() => {
        if(dueDateVal !== props.dueDate) {
            updateDueDate();
        }
    }, [dueDateVal, props.dueDate, updateDueDate]);

    useEffect(() => {
        if(isChecked && props.status !== "Completed") {
            // Sending request to update the status
            updateTask();
            dispatch(planActions.updateTaskStatus({
                id: props.planId,
                oldStatus: props.status,
                newStatus: 'Completed'
            }));
        }
    }, [isChecked, dispatch, updateTask, props.status, props.planId]);

    const checkboxStyles = {
        color: 'rgb(33, 115, 70)',
        '&.Mui-checked': {
          color: 'rgb(33, 115, 70)',
        },
        padding: 0
    };

    const personaStyles: IPersonaStyles = {
        root: {
            width: '35%'
        },
        details: {},
        primaryText: {},
        secondaryText: {},
        tertiaryText: {},
        optionalText: {},
        textContent: {}
    };

    const datePickerStyles: IDatePickerStyles = {
        textField: {
            "& .ms-TextField-field": {
                display: 'flex',
                'flex-direction': 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                fontSize: 12,
                fontWeight: 400,
                marginRight: '5px',
                float: 'left'
            }
        },
        root: {
            margin: '5px 0 0 0'
        },
        icon: {
            color: 'rgb(33, 115, 70)'
        },
        callout: {
            "& .ms-CalendarDay-dayIsToday": {
                backgroundColor: 'rgb(33, 115, 70) !important'
            }
        }
    }

    let datePickerRef: IDatePicker | null;

    function showDatePickerHandler() {
        datePickerRef!.showDatePickerPopup();
    }

    function handleClose() {
        setOpen(false);
    }

    async function getTaskDetailsById() {
        try {
            const {data} = await axios.get(`${baseUrl}/tasks/details/${props.id}`);
            return data;
        } catch (err) {
            showNotification(MessageType.Error, 'Something went wrong!');
        }
    }

    function editTaskHandler() {
        // Fetch task by id
        getTaskDetailsById().then(taskDetails => {
            setTaskData(taskDetails);
            setOpen(true);
        });
    }

    function getTaskMembersList() {

        return props.members.map(member => {

            const imageInitials = getPersonaInitials(member.firstName, member.lastName);
            const initialsColor = getPersonaColor(member.id);

            return (
                <Persona key={`${props.id}${member.id}`} 
                    imageInitials={imageInitials}
                    initialsColor={initialsColor} 
                    size={PersonaSize.size24} styles={personaStyles} />
            );
        });
    }

    function getTaskLabels() {
        const labelsArr = props.labels? JSON.parse(props.labels):[];
        return labelsArr.map((label: Label) => {

                const labelBgColor = getLabelColorValue(label.color);
                const labelFontColor = getLabelFontColorValue(label.color);

                const labelStyles = {
                    backgroundColor: labelBgColor,
                    color: labelFontColor,
                    padding: '5px', 
                    fontSize: '0.6rem', 
                    borderRadius: '3px',
                    margin: '3px'
                };

                return <span key={label.value} style={labelStyles}>{label.value}</span>
            });
    }

    function deleteTaskHandler() {
        deleteTask();
        setOpenConfirm(false);
    }

    function dueDateSelectHandler(selectedDate: Date | null | undefined) {
        if(selectedDate) {
            setDueDateVal(selectedDate.getTime());
        }
    }

    return (
        <>
            <Modal open={open} onClose={handleClose}>
                <TaskContextProvider taskData={taskData}>
                    <TaskForm onCloseModal={handleClose} />
                </TaskContextProvider>
            </Modal>
            {/* Confirmation dialog before deleting task */}
            <Dialog open={openConfirm} sx={{ '& .MuiDialog-paper': { fontSize: '1rem' } }}>
                <DialogContent>
                    You're about to delete task
                </DialogContent>
                <DialogActions>
                    <button className={Classes.primaryBtn} onClick={deleteTaskHandler}>
                        Confirm
                    </button>
                    <button className={Classes.cancelBtn} onClick={() => setOpenConfirm(false)}>
                        Cancel
                    </button>
                </DialogActions>
            </Dialog>
            {/* Confirmation dialog before deleting task */}
            {! (isRemoved) && <div className={Classes.taskCard}>
                <div className={Classes.topBar}>
                    <div className={Classes.planNameRow}>
                        <div className={Classes.planName}>{ props.planName }</div>
                        <div className={Classes.taskActionsContainer}>
                            <div className={Classes.taskActions} onClick={editTaskHandler}>
                                <Edit16Regular color="rgb(33, 115, 70)" />
                            </div>
                            <div className={Classes.taskActions} onClick={() => setOpenConfirm(true)}>
                                <Delete16Regular color="rgb(33, 115, 70)" />
                            </div>
                        </div>
                    </div>
                    <div className={Classes.titleRow}>
                        <div className={Classes.markCompleteButton}>
                            <Checkbox size="small" sx={checkboxStyles} checked={isChecked}
                                disabled={props.status === "Completed"} onChange={handleCheckboxToggle} />
                        </div>
                        <div className={Classes.title}  title={props.name} style={taskNameStyles}>
                            {props.name.length > 25 ? `${props.name.slice(0, 25)}...`: `${props.name}`}
                        </div>                      
                    </div>
                    {/* Displaying task labels */}
                    <div className={Classes.labelRow}>
                        { getTaskLabels() }
                    </div>
                </div>
                <div className={Classes.hrDiv}></div>
                <div className={Classes.bottomBar}>
                    <div className={Classes.bottomBarLeftSection}>
                        <DatePicker styles={datePickerStyles}
                            className={Classes.dateLabel}
                            onClick={showDatePickerHandler}
                            value={new Date(dueDateVal)}
                            onSelectDate={dueDateSelectHandler}
                            borderless={true}
                            openOnClick={false} 
                            componentRef={instance =>  datePickerRef = instance } />
                    </div>
                    <div className={Classes.bottomBarRightSection}>
                        { getTaskMembersList() }
                    </div>
                </div>
            </div>}
        </>
    )
}

export default Task;