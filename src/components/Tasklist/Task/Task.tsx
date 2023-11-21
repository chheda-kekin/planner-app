import React, { useState } from "react";
import TaskForm from "./TaskForm";
import TaskContextProvider from "./TaskContextProvider";
import { getPersonaInitials } from "../../../helper"; 
import { DatePicker, IDatePicker, IDatePickerStyles } from "@fluentui/react";
import { IPersonaSharedProps, IPersonaStyles, Persona, PersonaInitialsColor, PersonaSize } from '@fluentui/react/lib/Persona';
import { Checkbox } from "@mui/material";
import Modal from "@mui/material/Modal";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import Classes from "./Task.module.css";
import { initializeIcons } from '@fluentui/react';
initializeIcons();

type Member = {
    memberId: number,
    firstName: string,
    lastName: string
};

type Label = {
    color: string,
    value: string
};

type TaskProps = {
    displayModal: () => void,
    id: number, 
    name: string, 
    planName: string,
    dueDate: number,
    members: Member[],
    labels: Label[],
    personaColorCodes: Map<number, number>
};

const Task: React.FC<TaskProps> = (props) => {

    const { name, planName, dueDate, labels, members, displayModal } = props;

    const [isVisible, setIsVisible] = useState(false);
    const [open, setOpen] = useState(false);

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
                fontSize: 12,
                fontWeight: 400,
                'marginRight': '5px'
            }
        },
        root: {
            color: 'red',
            margin: '5px 0 0 0'
        },
        icon: {
        },
        callout: {
            "& .ms-CalendarDay-dayIsToday": {
                backgroundColor: 'rgb(33, 115, 70) !important'
            }
        }
    }

    const personaProps: IPersonaSharedProps = {
        imageInitials: "KC"
    };

    let datePickerRef: IDatePicker | null;

    function showDatePickerHandler() {
        datePickerRef!.showDatePickerPopup();
    }

    function mouseOverHandler() {
        setIsVisible(true);
    }

    function mouseLeaveHandler() {
        setIsVisible(false);
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
        })
    }

    return (
        <>
            <Modal open={open} onClose={handleClose}>
                <TaskContextProvider>
                    <TaskForm onCloseModal={handleClose} />
                </TaskContextProvider>
            </Modal>
            <div className={Classes.taskCard} onClick={openModal} onMouseOver={mouseOverHandler} onMouseLeave={mouseLeaveHandler}>
                {/* <div className={Classes.container}>
                    <div className={Classes.taskMenu}>Task menu</div>
                </div> */}
                <div className={Classes.topBar}>
                    <div className={Classes.planName}>{ planName }</div>
                    <div className={Classes.moreOptions}>
                        { isVisible && <MoreHorizIcon fontSize="small" style={{color: 'rgb(96, 94, 92)'}} /> }
                    </div>
                    <div className={Classes.titleRow}>
                        <div className={Classes.markCompleteButton}>
                            <Checkbox size="small" sx={checkboxStyles} />
                        </div>
                        <div className={Classes.title}>{name}</div>                      
                    </div>
                </div>
                <div className={Classes.bottomBar}>
                    <div className={Classes.bottomBarLeftSection} onClick={showDatePickerHandler}>
                        <DatePicker styles={datePickerStyles} className={Classes.dateLabel}  
                            value={new Date(dueDate)}
                            borderless={true}
                            openOnClick={false} 
                            componentRef={instance =>  datePickerRef = instance } />
                    </div>
                    <div className={Classes.bottomBarRightSection}>

                        { getTaskMembers() }
                        {/* <Persona {...personaProps} size={PersonaSize.size24} styles={personaStyles} />
                        <Persona {...personaProps} size={PersonaSize.size24} styles={personaStyles} initialsColor={PersonaInitialsColor.magenta} /> */}
                    </div>
                </div>
            </div>
        </>
    )

}

export default Task;