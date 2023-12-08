import React, { useState } from 'react';
import PersonPicker from '../../../../UI/PersonPicker/PersonPicker';
import { DatePicker, IDatePickerStyles, IFacepilePersona } from '@fluentui/react';
import { FacepilePersona } from '../../../../UI/PersonPicker/FacepilePersona';
import { TaskMember } from '../../../../constants';

import Classes from './NewTask.module.css';

const NewTask: React.FC = () => {

    const datePickerStyles: IDatePickerStyles = {
        textField: {
            "& .ms-TextField-field": {
                fontSize: 14,
                fontWeight: 400,
                color: 'rgb(50, 49, 48)',
                fontFamily: `"Segoe UI", "Segoe UI Web (West European)", "Segoe UI", -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif`,
                borderBottom: '2px solid rgb(33, 115, 70)',
                backgroundColor: '#f2f2f2',
                borderRadius: '3px 3px 0 0'
            }
        },
        root: {
            color: 'red',
            margin: '5px 0 0 0',
            width: '100%'
        },
        icon: {
        },
        callout: {
            "& .ms-CalendarDay-dayIsToday": {
                backgroundColor: 'rgb(33, 115, 70) !important'
            }
        }
    }

    const dueDateSelectHandler = (): void => {}

    const [taskMembers, setTaskMembers] = useState<TaskMember[]>([]);

    const addRemoveMembersHandler = (memberDetails: TaskMember): void => {
        if (taskMembers.findIndex(m => m.id === memberDetails.id) === -1) {
            setTaskMembers([...taskMembers, memberDetails]);
            
        } else {
            setTaskMembers(taskMembers.filter(m => m.id !== memberDetails.id));
        }
    }

    return (
        <>
            <div className={Classes.taskCard}>
                <div className={Classes.nameField}>
                    <input className={Classes.taskName} type='text' placeholder='Enter name * (required)' />
                </div>
                <div className={Classes.dueDateField}>
                    <DatePicker borderless={true} styles={datePickerStyles} value={new Date()} onSelectDate={dueDateSelectHandler} />
                </div>
                <div className={Classes.assignToField}>
                    <div>
                        <PersonPicker selectedMembers={taskMembers} 
                            selectMemberHandler={addRemoveMembersHandler} />
                    </div>
                </div>
                <button className={Classes.addTaskBtn}>Add</button>
            </div>
        </>
    )
}

export default NewTask;