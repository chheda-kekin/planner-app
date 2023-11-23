import React, { useState, useEffect } from "react";
import axios from "axios";
import { usePlannerDispatch } from "../../../Store";
import { NotificationActions } from "../../../slices/notification-slice";
import TaskForm from "./TaskForm";
import TaskContextProvider from "./TaskContextProvider";
import { getPersonaInitials, getLabelColorValue, getLabelFontColorValue } from "../../../helper";
import { Label, LabelFontColors, LabelColors, MessageType, baseUrl } from "../../../constants"; 
import { DatePicker, IDatePicker, IDatePickerStyles } from "@fluentui/react";
import { IPersonaSharedProps, IPersonaStyles, Persona, PersonaInitialsColor, PersonaSize } from '@fluentui/react/lib/Persona';
import { Checkbox } from "@mui/material";
import Modal from "@mui/material/Modal";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import Classes from "./Task.module.css";
import { Delete16Regular, Edit16Regular } from '@fluentui/react-icons'
import { initializeIcons } from '@fluentui/react';
initializeIcons();

type Member = {
    memberId: number,
    firstName: string,
    lastName: string
};

type TaskProps = {
    id: number, 
    name: string,
    planName: string,
    dueDate: number,
    members: Member[],
    labels: string,
    personaColorCodes: Map<number, number>
};

const Task: React.FC<TaskProps> = (props) => {

    const [open, setOpen] = useState(false);
    const [showActions, setShowActions] = useState(false);

    const [isRemoved, setIsRemoved] = useState(false);

    const dispatch = usePlannerDispatch();

    function showNotification(type: string, message: string): void {
        dispatch(NotificationActions.showNotification({
            message: message, 
            notificationType: type, 
            isNotification: true
        }));
    }

    async function deleteTask() {
        try {
            const url = `${baseUrl}/tasks/delete/${props.id}`;
            const { status } = await axios.delete(url);
            if(status === 200) {
                setIsRemoved(true);
            }
        } catch(err) {
            showNotification(MessageType.Error, 'Unable to delete something went wrong!');
        }            
    }

    useEffect(() => {
        if(isRemoved) {
            showNotification(MessageType.Success, 'Task deleted!');
        }
    }, [isRemoved]);

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

    function openModal() {
        setOpen(true);
    }

    function getTaskMembers() {

        return props.members.map(member => {

            const imageInitials = getPersonaInitials(member.firstName, member.lastName);
            const initialsColor = props.personaColorCodes.get(member.memberId);

            return (
                <Persona key={`${props.id}${member.memberId}`} 
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
    }

    return (
        <>
            <Modal open={open} onClose={handleClose}>
                <TaskContextProvider>
                    <TaskForm onCloseModal={handleClose} />
                </TaskContextProvider>
            </Modal>
            {! (isRemoved) && <div className={Classes.taskCard}>
                <div className={Classes.topBar}>
                    <div className={Classes.planNameRow}>
                        <div className={Classes.planName}>{ props.planName }</div>
                        <div className={Classes.taskActionsContainer} onClick={() => {setShowActions(current => ! current)}}>
                            <div className={Classes.taskActions} onClick={openModal}>
                                <Edit16Regular color="rgb(33, 115, 70)" />
                            </div>
                            <div className={Classes.taskActions} onClick={deleteTaskHandler}>
                                <Delete16Regular color="rgb(33, 115, 70)" />
                            </div>
                        </div>
                    </div>
                    <div className={Classes.titleRow}>
                        <div className={Classes.markCompleteButton}>
                            <Checkbox size="small" sx={checkboxStyles} />
                        </div>
                        <div className={Classes.title} title={props.name}>
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
                    <div className={Classes.bottomBarLeftSection} onClick={showDatePickerHandler}>
                        <DatePicker styles={datePickerStyles} className={Classes.dateLabel}  
                            value={new Date(props.dueDate)}
                            borderless={true}
                            openOnClick={false} 
                            componentRef={instance =>  datePickerRef = instance } />
                    </div>
                    <div className={Classes.bottomBarRightSection}>
                        { getTaskMembers() }
                    </div>
                </div>
            </div>}
        </>
    )
}

export default Task;