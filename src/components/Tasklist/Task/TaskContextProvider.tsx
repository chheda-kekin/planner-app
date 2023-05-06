import React, { useState } from 'react';
import TaskContext, { TaskContextType } from './task-context';
import { Tag } from '../../../constants';

const TaskContextProvider: React.FC<{ children: React.ReactNode }> = (props) => {

    const [taskName, setTaskName] = useState("Some random dummy name");
    const [tags, setTags] = useState<Tag[]>([]);

    console.log('Component re-rendered');

    function addTagHandler(tag: Tag) {
        let newTags: Tag[] = [];
        if(tags.findIndex(tg => tg.color === tag.color) === -1) {
            newTags = [...tags, tag];
            setTags(newTags);
        } else {
            const tgVal = tags.find(tg => tg.color === tag.color);
            const tempTags = tags.filter(tg => tg.color !== tag.color);
            if(tgVal?.name !== tag.name) {
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

    const taskContextValue: TaskContextType = {
        name: taskName,
        tags: tags,
        onAddTag: addTagHandler,
        onRemoveTag: removeTagHandler,
        onTaskNameChange: taskNameChangeHandler
    };

    return (
        <TaskContext.Provider value={taskContextValue}>
            { props.children }
        </TaskContext.Provider>
    );
}

export default TaskContextProvider;