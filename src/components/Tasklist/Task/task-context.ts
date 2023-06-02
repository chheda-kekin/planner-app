import React from "react";
import { Tag, TaskComment, PersonaInitialsColor } from "../../../constants";

export type TaskContextType = {
    name: string,
    tags: Tag[],
    taskComments: TaskComment[],
    taskStatus: string,
    taskPriority: string,
    onTaskNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onAddTag: (tag: Tag) => void,
    onRemoveTag: (tag: Tag) => void,
    onAddComment: (comment: string) => void,
    onTaskStatusChange: (status: string) => void,
    onTaskPriorityChange: (priority: string) => void
};

const TaskContext = React.createContext<TaskContextType>({
    name: '',
    tags: [],
    taskComments: [],
    taskStatus: '',
    taskPriority: '',
    onTaskNameChange: (e: React.ChangeEvent<HTMLInputElement>) => {},
    onAddTag: (tag: Tag) => {},
    onRemoveTag: (tag: Tag) => {},
    onAddComment: (comment: string) => {},
    onTaskStatusChange: (status: string) => {},
    onTaskPriorityChange: (priority: string) => {}
});

export default TaskContext;