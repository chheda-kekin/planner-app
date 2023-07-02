import React from "react";
import { Tag, TaskComment, PersonaInitialsColor } from "../../../constants";
import { IFacepilePersona } from "@fluentui/react";

export type TaskContextType = {
    name: string,
    members: IFacepilePersona[],
    tags: Tag[],
    taskComments: TaskComment[],
    taskStatus: string,
    taskPriority: string,
    onTaskNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onAddMember: (member: IFacepilePersona) => void,
    onRemoveMember: (member: IFacepilePersona) => void,
    onAddTag: (tag: Tag) => void,
    onRemoveTag: (tag: Tag) => void,
    onAddComment: (comment: string) => void,
    onTaskStatusChange: (status: string) => void,
    onTaskPriorityChange: (priority: string) => void
};

const TaskContext = React.createContext<TaskContextType>({
    name: '',
    members: [],
    tags: [],
    taskComments: [],
    taskStatus: '',
    taskPriority: '',
    onTaskNameChange: (e: React.ChangeEvent<HTMLInputElement>) => {},
    onAddMember: (member: IFacepilePersona) => {},
    onRemoveMember: (member: IFacepilePersona) => {},
    onAddTag: (tag: Tag) => {},
    onRemoveTag: (tag: Tag) => {},
    onAddComment: (comment: string) => {},
    onTaskStatusChange: (status: string) => {},
    onTaskPriorityChange: (priority: string) => {}
});

export default TaskContext;