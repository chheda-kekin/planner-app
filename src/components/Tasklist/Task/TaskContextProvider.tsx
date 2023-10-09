import React, { useState } from 'react';
import TaskContext, { TaskContextType } from './task-context';
import { Tag, PersonaInitialsColor, TaskComment } from '../../../constants';
import { IFacepilePersona } from '@fluentui/react';

const TaskContextProvider: React.FC<{ children: React.ReactNode }> = (props) => {

    const tskCommntsArr: TaskComment[] = [
        {
            id: '1',
            commentText: 'Adding to the in progress',
            personaProps: { text: 'Kekin Chheda', imageInitials: 'KC' },
            commentDate: new Date('December 17, 2022 03:24:00'),
            initialsColor: PersonaInitialsColor.green
        },
        {
            id: '2',
            commentText: 'Needs confirmation about UI wireframes',
            personaProps: { text: 'Kekin Chheda', imageInitials: 'KC' },
            commentDate: new Date('December 23, 2022 03:24:00'),
            initialsColor: PersonaInitialsColor.blue
        },
        {
            id: '3',
            commentText: 'Needs confirmation about DoD',
            personaProps: { text: 'Kekin Chheda', imageInitials: 'KC' },
            commentDate: new Date('February 2, 2023 03:30:00'),
            initialsColor: PersonaInitialsColor.lightBlue
        }
    ];

    const taskMembers: IFacepilePersona[] = [
        {imageInitials: 'KC', personaName: 'Kekin Chheda', initialsColor: PersonaInitialsColor.darkGreen}
    ];

    const startDateVal = new Date().getTime();
    const endDateVal = new Date().getTime();

    const [taskName, setTaskName] = useState("Completing React JS project");
    const [tags, setTags] = useState<Tag[]>([{color: 'Yellow', name: 'Imp'}]);
    const [taskComments, setTaskComments] = useState<TaskComment[]>(tskCommntsArr);
    const [taskStatus, setTaskStatus] = useState("Not Started");
    const [taskPriority, setTaskPriority] = useState("Low");
    const [members, setMembers] = useState<any>(taskMembers);
    const [startDate, setStartDate] = useState(startDateVal);
    const [dueDate, setDueDate] = useState(endDateVal);

    function addTagHandler(tag: Tag) {
        let newTags: Tag[] = [];
        if (tags.findIndex(tg => tg.color === tag.color) === -1) {
            newTags = [...tags, tag];
            setTags(newTags);
        } else {
            const tgVal = tags.find(tg => tg.color === tag.color);
            const tempTags = tags.filter(tg => tg.color !== tag.color);
            if (tgVal?.name !== tag.name) {
                newTags = [...tempTags, tag];
                setTags(newTags);
            }
        }
    }

    function removeTagHandler(tag: Tag) {
        setTags(tags.filter(tg => tg.name !== tag.name));
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
            id: `${Math.random()}`,
            commentText: comment,
            personaProps: {imageInitials: 'KC', text: currentUser},
            commentDate: new Date(),
            initialsColor: initialsColor
        };

        setTaskComments(prevCommnts => [...prevCommnts, commentObj]);
    }

    function taskStatusChangeHandler(status: string) {
        setTaskStatus(status);
    }

    function taskPriorityChangeHandler(priority: string) {
        setTaskPriority(priority);
    }

    function addMemberHandler(member: IFacepilePersona) {
        console.log('addMemberHandler called...', members);
        setMembers([...members, member]);
        console.log('All task members are ', members);
    }

    function removeMemberHandler(member: IFacepilePersona) {
        console.log('removeMemberHandler called...');
        setMembers(members.filter((m: any) => m.personaName !== member.personaName));
    }

    function setStartDateHandler(date: string) {
        console.log(`Start date is: ${date}`);
        const dtObj = new Date(date);
        setStartDate(dtObj.getTime());
    }

    function setDueDateHandler(date: string) {
        console.log(`Due date is ${date}`);
        const dtObj = new Date(date);
        setDueDate(dtObj.getTime());
    }

    const taskContextValue: TaskContextType = {
        name: taskName,
        members: members,
        tags: tags,
        taskComments: taskComments,
        taskStatus: taskStatus,
        taskPriority: taskPriority,
        startDate: startDate,
        dueDate: dueDate,
        onStartDateChange: setStartDateHandler,
        onDueDateChange: setDueDateHandler,
        onAddTag: addTagHandler,
        onRemoveTag: removeTagHandler,
        onTaskNameChange: taskNameChangeHandler,
        onAddComment: addCommentHandler,
        onTaskStatusChange: taskStatusChangeHandler,
        onTaskPriorityChange: taskPriorityChangeHandler,
        onAddMember: addMemberHandler,
        onRemoveMember: removeMemberHandler
    };

    return (
        <TaskContext.Provider value={taskContextValue}>
            {props.children}
        </TaskContext.Provider>
    );
}

export default TaskContextProvider;