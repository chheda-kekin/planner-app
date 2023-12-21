import React, { useState } from 'react';
import { useParams } from 'react-router-dom'; 
import PersonPicker from '../../../../UI/PersonPicker/PersonPicker';
import { DatePicker, IDatePickerStyles } from '@fluentui/react';
import { TaskMember, TaskPriority } from '../../../../constants';
import { usePlannerDispatch } from '../../../../Store';
import { NotificationActions } from '../../../../slices/notification-slice';
import { MessageType, baseUrl } from '../../../../constants';

import { planActions } from '../../../../slices/plan-slice';

import axios from 'axios';

import Classes from './NewTask.module.css';


const NewTask: React.FC<{status: string, onAddNewTask: () => void}> = (props) => {

    const { id } = useParams();
    const planId = id ? parseInt(id): -1;

    const dispatch = usePlannerDispatch();

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

    const [taskName, setTaskName] = useState('');
    const [taskMembers, setTaskMembers] = useState<TaskMember[]>([]);
    const [dueDate, setDueDate] = useState(Date.now());

    const taskNameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTaskName(e.target.value);
    }

    const dueDateSelectHandler = (date: Date | null | undefined): void => {
        if(date) {
            console.log(' Selected start date is: ', date);
            setDueDate(date.getTime());
        }
    }

    const addRemoveMembersHandler = (memberDetails: TaskMember): void => {
        if (taskMembers.findIndex(m => m.id === memberDetails.id) === -1) {
            setTaskMembers([...taskMembers, memberDetails]);
            
        } else {
            setTaskMembers(taskMembers.filter(m => m.id !== memberDetails.id));
        }
    }

    const addTaskHandler = async (e: React.MouseEvent) => {
        const members = taskMembers.map(m => m.id);

        if(taskName === "") {
            dispatch(NotificationActions.showNotification({
                message: 'Task name can not be blank',
                notificationType: MessageType.Error,
                isNotification: true
            }));

            return;
        }
        
        if(members.length > 0) {
            dispatch(NotificationActions.showNotification({
                message: 'Please select a member to assign a task to',
                notificationType: MessageType.Error,
                isNotification: true
            }));
             
            return;
        }

        const requestBody = {
            planId: planId,
            name: taskName,
            status: props.status,
            priority: TaskPriority.Low,
            startDate: Date.now(),
            dueDate: dueDate,
            created: Date.now(),
            updated: Date.now(),
            notes: "",
            members: members,
            labels: [],
            comments: []
        };

        try {
            const { status } = await axios.put(`${baseUrl}/tasks/update`, requestBody);

            if(status === 200) {
                dispatch(NotificationActions.showNotification({
                    message: 'Task added successfully!',
                    notificationType: MessageType.Success,
                    isNotification: true
                }));

                dispatch(planActions.addTaskToPlan({
                    id: planId,
                    status: props.status,
                    isDue: false
                }));

                props.onAddNewTask();
            }
        } catch(err: any) {
            dispatch(NotificationActions.showNotification({
                message: `${err.message}`,
                notificationType: MessageType.Error,
                isNotification: true
            }));
        }
    }

    return (
        <>
            <div className={Classes.taskCard}>
                <div className={Classes.nameField}>
                    <input type='text' className={Classes.taskName} value={taskName} 
                        onChange={taskNameChangeHandler} placeholder='Enter name * (required)' />
                </div>
                <div className={Classes.dateFieldWrapper}>
                    <div className={Classes.dateField}>
                        <DatePicker borderless={true} styles={datePickerStyles} 
                            value={new Date(dueDate)} onSelectDate={dueDateSelectHandler} />
                    </div>
                </div>
                <div className={Classes.assignToField}>
                    <div>
                        <PersonPicker selectedMembers={taskMembers} 
                            selectMemberHandler={addRemoveMembersHandler} />
                    </div>
                </div>
                <button className={Classes.addTaskBtn} onClick={addTaskHandler}>Add</button>
            </div>
        </>
    )
}

export default NewTask;