import React from "react";
import { Tag, TaskComment, PersonaInitialsColor } from "../../../constants";

export type TaskContextType = {
    name: string,
    tags: Tag[],
    taskComments: TaskComment[],
    onTaskNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onAddTag: (tag: Tag) => void,
    onRemoveTag: (tag: Tag) => void,
    onAddComment: (comment: string) => void
};

const TaskContext = React.createContext<TaskContextType>({
    name: '',
    tags: [],
    taskComments: [],
    onTaskNameChange: (e: React.ChangeEvent<HTMLInputElement>) => {},
    onAddTag: (tag: Tag) => {},
    onRemoveTag: (tag: Tag) => {},
    onAddComment: (comment: string) => {}
});

export default TaskContext;