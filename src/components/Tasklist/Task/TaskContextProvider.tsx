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
    const taskCommentsArr: TaskComment[] = comments.map((commentEle: any) => {
        const { comment, member, date } = commentEle;

        console.log('### typeof member', typeof member);

        // Get member details by id

        const memberDetails = props.taskData.members.find((m: Member) => m.id === member);
        let firstName, lastName;
        if(memberDetails) {
            firstName = memberDetails.firstName;
            lastName = memberDetails.lastName;
        } else {
            firstName = 'Kekin';
            lastName = 'Chheda';
        }

        const memberLastName = lastName ? lastName : "";
        const imageInitials = getPersonaInitials(firstName, memberLastName);

        return {
            id: getRandomId(),
            memberId: member,
            commentText: comment.trim(),
            personaProps: { text: `${firstName} ${memberLastName}`, imageInitials: imageInitials },
            commentDate: date,
            initialsColor: getPersonaColor(member)
        };
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
        console.log('### removeLabelHandler called');
        console.log(label);
        setLabels(labels.filter(l => l.color !== label.color));
    }

    function taskNameChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        setTaskName(e.target.value);
    }

    function addCommentHandler(comment: string) {
        // Getting details of current logged in user needs to replace once start working on 
        // authentication
        const memberId = 1;
        const firstName = 'Kekin';
        const lastName = 'Chheda'

        const imageInitials = getPersonaInitials(firstName, lastName);

        const commentObj: TaskComment = {
            id: getRandomId(),
            memberId: memberId,
            commentText: comment.trim(),
            personaProps: {imageInitials: imageInitials, text: `${firstName} ${lastName}`},
            commentDate: Date.now(),
            initialsColor: getPersonaColor(memberId),
            
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
        if(notes !== "") {
            setNotes(notes);
        }
    }

    const taskContextValue: TaskContextType = {
        id: props.taskData.id,
        name: taskName,
        planId: props.taskData.planId,
        planName: planName,
        members: members,
        labels: labels,
        taskComments: taskComments,
        taskStatus: taskStatus,
        taskPriority: taskPriority,
        startDate: startDate,
        dueDate: dueDate,
        createdDate: props.taskData.created,
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