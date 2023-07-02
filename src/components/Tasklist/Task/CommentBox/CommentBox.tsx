import React, { useState, useContext } from 'react';
import CommentRow from './CommentRow';
import { TaskComment } from '../../../../constants';
import TaskContext from '../task-context';

import Classes from './CommentsBox.module.css';

const CommentBox: React.FC<{taskComments: TaskComment[]}> = ({taskComments}) => {

    const [commentVal, setCommentVal] = useState('');
    const tskCtx = useContext(TaskContext);

    const changeValueHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCommentVal(e.target.value);
    }

    const addCmmntsHandler = () => {
        tskCtx.onAddComment(commentVal);
        setCommentVal('');
    }
    
    return (
        <>
            <div className={Classes.commntsSection}>
                <div className={Classes.sectionHdr}>Comments</div>
                <div>
                    <textarea className={Classes.commntsFld} value={commentVal} onChange={changeValueHandler} />
                </div>
            </div>
            <div className={Classes.btnWrapper}>
                <button className={Classes.entrCommntBtn} onClick={addCmmntsHandler}>Send</button>
            </div>
            <div>
                {taskComments.map(comment => {
                    return <CommentRow key={comment.id} comment={comment} />
                })}
            </div>
        </>
    )
}

export default CommentBox;