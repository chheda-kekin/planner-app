import React, { useState } from 'react';
import TaskContext, { TaskContextType } from './task-context';
import { PersonaInitialsColor, TaskComment, 
    Member, TaskMember, Label } from '../../../constants';
import { getPersonaInitials, getRandomId, 
    getTaskMembers, getPersonaColor } from '../../../helper';
import { usePlannerDispatch } from '../../../Store';
import { NotificationActions } from '../../../slices/notification-slice';
import { MessageType } from '../../../constants';

const TaskContextProvider: React.FC<{ taskData: any,
    children: React.ReactNode }> = (props) => {

    const dispatch = usePlannerDispatch();

    const planName = props.taskData.planName;
    const comments = props.taskData.comments;
    const lastUpdatedDate = props.taskData.updated;

    // Get Task comments
    const taskCommentsArr: TaskComment[] = comments.map((commentEle: {comment: string, member: number, date: number}) => {
        const { comment, member, date } = commentEle;

        // Get member details by id
        const { firstName, lastName } = props.taskData.members.find((m: Member) => m.id === member);
        const memberLastName = lastName ? lastName : "";
        const imageInitials = getPersonaInitials(firstName, memberLastName);

        return {
            id: getRandomId(),
            commentText: comment.trim(),
            personaProps: { text: `${firstName} ${memberLastName}`, imageInitials: imageInitials },
            commentDate: new Date(date),
            initialsColor: getPersonaColor(member)
        }
    });

    // Get Task members
    const taskMembers: TaskMember[] = getTaskMembers(props.taskData.members);

    // Get Task labels
    const taskLabels = props.taskData.labels;

    const startDateVal = props.taskData.start;
    const endDateVal = props.taskData.due;

    // Fetching Task notes
    const taskNotes = props.taskData.notes !== "" ? props.taskData.notes.trim(): "";

    const [taskName, setTaskName] = useState(props.taskData.name);
    const [labels, setLabels] = useState<Label[]>(taskLabels);
    const [taskComments, setTaskComments] = useState<TaskComment[]>(taskCommentsArr);
    const [taskStatus, setTaskStatus] = useState(props.taskData.status);
    const [taskPriority, setTaskPriority] = useState(props.taskData.priority);
    const [members, setMembers] = useState<TaskMember[]>(taskMembers);
    const [startDate, setStartDate] = useState(startDateVal);
    const [dueDate, setDueDate] = useState(endDateVal);
    const [notes, setNotes] = useState<string>(taskNotes);

    function addLabelHandler(label: Label) {
        let newLabels: Label[] = [];
        if (labels.findIndex(l => l.color === label.color) === -1) {
            newLabels = [...labels, label];
            setLabels(newLabels);
        } else {
            const labelVal = labels.find(l => l.color === label.color);
            const tempLabels = labels.filter(l => l.color !== label.color);
            if (labelVal?.value !== label.value) {
                newLabels = [...tempLabels, label];
                setLabels(newLabels);
            }
        }
    }

    function removeLabelHandler(label: Label) {
        setLabels(labels.filter(l => l.color !== label.color));
    }

    function taskNameChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        setTaskName(e.target.value);
    }

    function addCommentHandler(comment: string) {
        const currentUser = 'Kekin Chheda';
        const user = taskComments.find(comnt => comnt.personaProps.text === currentUser);

        let initialsColor: PersonaInitialsColor;

        if (user) {
            initialsColor = user.initialsColor;
        } else {
            let rand = Math.ceil(Math.random() * 1000);
            initialsColor = rand % 25;
        }

        const commentObj: TaskComment = {
            id: getRandomId(),
            commentText: comment,
            personaProps: {imageInitials: 'KC', text: currentUser},
            commentDate: new Date(),
            initialsColor: initialsColor,
            
        };

        setTaskComments(prevCommnts => [...prevCommnts, commentObj]);
    }

    function taskStatusChangeHandler(status: string) {
        setTaskStatus(status);
    }

    function taskPriorityChangeHandler(priority: string) {
        setTaskPriority(priority);
    }

    function addMemberHandler(member: TaskMember) {
        console.log('addMemberHandler called...', members);
        setMembers([...members, member]);
        console.log('All task members are ', members);
    }

    function removeMemberHandler(member: TaskMember) {
        console.log('removeMemberHandler called...');
        setMembers(members.filter((m: any) => m.id !== member.id));
    }

    function setStartDateHandler(date: string) {
        const dtObj = new Date(date);
        setStartDate(dtObj.getTime());
    }

    function setDueDateHandler(date: string) {
        const dtObj = new Date(date);
        setDueDate(dtObj.getTime());
    }

    function notesUpdateHandler(notes: string) {
        var specials = /[*|\":<>[\]{}`\\()';@&$]/;

        if(notes !== "") {
            if(specials.test(notes)) {
                dispatch(NotificationActions.showNotification({
                        message: "Please enter valid text.", 
                        notificationType: MessageType.Error, 
                        isNotification: true
                    }))
            } else {
                setNotes(notes);
            }
        }
    }

    const taskContextValue: TaskContextType = {
        name: taskName,
        planName: planName,
        members: members,
        labels: labels,
        taskComments: taskComments,
        taskStatus: taskStatus,
        taskPriority: taskPriority,
        startDate: startDate,
        dueDate: dueDate,
        lastUpdatedDate: lastUpdatedDate,
        notes: notes,
        onStartDateChange: setStartDateHandler,
        onDueDateChange: setDueDateHandler,
        onAddLabel: addLabelHandler,
        onRemoveLabel: removeLabelHandler,
        onTaskNameChange: taskNameChangeHandler,
        onAddComment: addCommentHandler,
        onTaskStatusChange: taskStatusChangeHandler,
        onTaskPriorityChange: taskPriorityChangeHandler,
        onAddMember: addMemberHandler,
        onRemoveMember: removeMemberHandler,
        onUpdateNotes: notesUpdateHandler
    };

    return (
        <TaskContext.Provider value={taskContextValue}>
            {props.children}
        </TaskContext.Provider>
    );
}

export default TaskContextProvider;