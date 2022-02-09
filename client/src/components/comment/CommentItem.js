import React, { Fragment } from 'react';
import DeleteComment from './DeleteComment';

const CommentItem = ({ comment }) => {
    const { body, user, post, id } = comment;

    return (
        <div className='border-2 mb-1 rounded-md'>
            <p>{body}</p>
            <div>
                <DeleteComment userId={user} postId={post} commentId={id}/>
            </div>
        </div>
    );
};

export default CommentItem;
