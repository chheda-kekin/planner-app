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

const getDateString = (date: number): string => {
    console.log('#### Comment date', date);
    let dateStr = '';
    const commentDate = new Date(date);
    console.log('### Comment date obj', commentDate);
    const year = commentDate.getFullYear();
    const month = MonthNames[commentDate.getMonth()];
    const dateVal = commentDate.getDate();
    const hours = commentDate.getHours();
    const minutes = commentDate.getMinutes();

    dateStr = `${month} ${dateVal},${year} ${hours}:${minutes}`;

    console.log('### Date String', dateStr);

    return dateStr;
}

const CommentRow: React.FC<{comment: TaskComment}> = ({comment}) => {

    console.log('#### type of commentDate', typeof comment.commentDate);
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