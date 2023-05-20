import React from 'react';
import DeleteComment from './DeleteComment';

const CommentItem = ({ comment }) => {
    const { body, user, post, id } = comment;

    return (
        <div className='border-2 mb-2 rounded-md py-1 px-2'>
            <p>{body}</p>
            <div>
                <DeleteComment userId={user} postId={post} commentId={id} />
            </div>
        </div>
    );
};

export default CommentItem;
