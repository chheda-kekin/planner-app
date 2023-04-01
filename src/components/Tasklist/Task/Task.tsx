import { Checkbox } from "@mui/material";
import React, { useState } from "react";
import { DatePicker, mergeStyles, IDatePicker, ICalendarProps, IDatePickerStyles } from "@fluentui/react";
import { IPersonaSharedProps, IPersonaStyles, Persona, PersonaInitialsColor, PersonaSize } from '@fluentui/react/lib/Persona';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';


import Classes from "./Task.module.css";
import AppClasses from "../../../App.module.css";


const Task: React.FC = () => {

    const [isVisible, setIsVisible] = useState(false);

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
                fontWeight: 400
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
    }

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

    return (
        <>
            <div className={Classes.taskCard} onMouseOver={mouseOverHandler} onMouseLeave={mouseLeaveHandler}>
                <div className={Classes.container}>
                    <div className={Classes.taskMenu}>Task menu</div>
                </div>
                <div className={Classes.topBar}>
                    <div className={Classes.planName}>Making Planner App in ReactJS + TS</div>
                    <div className={Classes.moreOptions}>
                        { isVisible && <MoreHorizIcon fontSize="small" style={{color: 'rgb(96, 94, 92)'}} /> }
                    </div>
                    <div className={Classes.titleRow}>
                        <div className={Classes.markCompleteButton}>
                            <Checkbox size="small" sx={checkboxStyles} />
                        </div>
                        <div className={Classes.title}>Fixing Piechart height issue</div>                      
                    </div>
                </div>
                <div className={Classes.bottomBar}>
                    <div className={Classes.bottomBarLeftSection} onClick={showDatePickerHandler}>
                        <CalendarMonthIcon className={AppClasses.matIcon} fontSize="small" />                        
                        <DatePicker styles={datePickerStyles} className={Classes.dateLabel} placeholder="Due"  borderless={true} openOnClick={false} componentRef={instance =>  datePickerRef = instance } />
                    </div>
                    <div className={Classes.bottomBarRightSection}>
                        <Persona {...personaProps} size={PersonaSize.size24} styles={personaStyles} />
                        <Persona {...personaProps} size={PersonaSize.size24} styles={personaStyles} initialsColor={PersonaInitialsColor.magenta} />
                    </div>
                </div>
            </div>
        </>
    )

}

export default Task;