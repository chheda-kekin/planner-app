import React from "react";
import { Tag } from "../../../constants";

export type TaskContextType = {
    name: string,
    tags: Tag[],
    onTaskNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onAddTag: (tag: Tag) => void,
    onRemoveTag: (tag: Tag) => void
};

const TaskContext = React.createContext<TaskContextType>({
    name: '',
    tags: [],
    onTaskNameChange: (e: React.ChangeEvent<HTMLInputElement>) => {},
    onAddTag: (tag: Tag) => {},
    onRemoveTag: (tag: Tag) => {}
});

export default TaskContext;