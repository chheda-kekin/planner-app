import React from "react";
import { Persona, PersonaSize, IPersonaProps, IPersonaStyles } from "@fluentui/react/lib/Persona";
import { PersonaInitialsColor, TaskComment, MonthNames } from "../../../../constants";

import Classes from './CommentRow.module.css';

const personaStyles: IPersonaStyles = {
    root: {
        
    },
    details: {},
    primaryText: {
        color: 'rgb(96, 94, 92)',
        fontSize: '12px'
    },
    secondaryText: {},
    tertiaryText: {},
    optionalText: {},
    textContent: {}
};

const getDateString = (date: Date) => {
    const year = date.getFullYear();
    const month = MonthNames[date.getMonth()];
    const dateVal = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${month} ${dateVal},${year} ${hours}:${minutes}`
}


const CommentRow: React.FC<{comment: TaskComment}> = ({comment}) => {
    return (
        <>
            <div className={Classes.commntRwWrpr}>
                <div className={Classes.commntRw}>
                    <Persona {...comment.personaProps} styles={personaStyles} size={PersonaSize.size24} initialsColor={comment.initialsColor} />
                    <div className={Classes.dtTmTxt}>{getDateString(comment.commentDate)}</div>
                </div>
                <div className={Classes.commntTxt}>{comment.commentText}</div>
            </div>
        </>
    )
}

export default CommentRow;