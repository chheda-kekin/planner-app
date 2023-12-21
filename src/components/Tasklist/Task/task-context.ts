import React from "react";
import { TaskComment, TaskMember, Label } from "../../../constants";

export type TaskContextType = {
    id: number,
    name: string,
    planId: number,
    planName: string,
    members: TaskMember[],
    labels: Label[],
    taskComments: TaskComment[],
    taskStatus: string,
    taskPriority: string,
    startDate: number,
    dueDate: number,
    createdDate: number,
    lastUpdatedDate: number,
    notes: string,
    onTaskNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onAddMember: (member: TaskMember) => void,
    onRemoveMember: (member: TaskMember) => void,
    onAddLabel: (label: Label) => void,
    onRemoveLabel: (label: Label) => void,
    onAddComment: (comment: string) => void,
    onTaskStatusChange: (status: string) => void,
    onTaskPriorityChange: (priority: string) => void,
    onStartDateChange: (date: string) => void,
    onDueDateChange: (date: string) => void,
    onUpdateNotes: (notes: string) => void
};

const TaskContext = React.createContext<TaskContextType>({
    id: -1,
    name: '',
    planId: -1,
    planName: '',
    members: [],
    labels: [],
    taskComments: [],
    taskStatus: '',
    taskPriority: '',
    startDate: new Date().getTime(),
    dueDate: new Date().getTime(),
    lastUpdatedDate: new Date().getTime(),
    createdDate: Date.now(),
    notes: '',
    onStartDateChange: (startDate: string) => {},
    onDueDateChange: (dueDate: string) => {},
    onTaskNameChange: (e: React.ChangeEvent<HTMLInputElement>) => {},
    onAddMember: (member: TaskMember) => {},
    onRemoveMember: (member: TaskMember) => {},
    onAddLabel: (label: Label) => {},
    onRemoveLabel: (label: Label) => {},
    onAddComment: (comment: string) => {},
    onTaskStatusChange: (status: string) => {},
    onTaskPriorityChange: (priority: string) => {},
    onUpdateNotes: (notes: string) => {}
});

export default TaskContext;